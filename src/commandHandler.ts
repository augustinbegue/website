import type { PageComponent } from "./global";
import { errorMessage } from "./stores";

export class commandHandler {
    private pages: PageComponent[];
    private _commands: { key: string, command: () => void }[] = [];
    private _currentPage: PageComponent;
    private _currentPageIndex: number;

    commandHistory: string[] = [];
    _helpPage: PageComponent;
    _errorPage: PageComponent;

    private addCommand(key: string, command: () => void) {
        this._commands.push({ key, command });
    }

    public async hideAll() {
        this._helpPage.outro();
        await this._errorPage.outro();
    }

    constructor(commandInputEl: HTMLElement, helpPage: PageComponent, errorPage: PageComponent, pages: PageComponent[]) {
        this.pages = pages;
        this._helpPage = helpPage;
        this._errorPage = errorPage;
        this._currentPage = pages[0];
        this._currentPageIndex = 0;

        this.addCommand("display home", async () => {
            this.hideAll();
            await this._currentPage.outro();
            pages[0].intro();
            this._currentPage = pages[0];
            this._currentPageIndex = 0;
        });

        this.addCommand("display about", async () => {
            this.hideAll();
            await this._currentPage.outro();
            pages[1].intro();
            this._currentPage = pages[1];
            this._currentPageIndex = 1;
        });

        this.addCommand("display projects", async () => {
            this.hideAll();
            await this._currentPage.outro();
            pages[2].intro();
            this._currentPage = pages[2];
            this._currentPageIndex = 2;
        });

        this.addCommand("display posts", async () => {
            this.hideAll();
            await this._currentPage.outro();
            pages[3].intro();
            this._currentPage = pages[3];
            this._currentPageIndex = 3;
        });

        this.addCommand("display repos", async () => {
            this.hideAll();
            await this._currentPage.outro();
            pages[4].intro();
            this._currentPage = pages[4];
            this._currentPageIndex = 4;
        });

        this.addCommand("help", async () => {
            await errorPage.outro();
            await helpPage.intro();
        });
    }

    public nextPage = async () => {
        this._currentPageIndex = (this._currentPageIndex + 1) % this.pages.length;

        window.history.pushState({}, document.title, `/${this._commands[this._currentPageIndex].key.split(' ')[1]}`);
        this._commands[this._currentPageIndex].command();
    };
    public prevPage = async () => {
        this._currentPageIndex = (this._currentPageIndex - 1 + this.pages.length) % this.pages.length;

        window.history.pushState({}, document.title, `/${this._commands[this._currentPageIndex].key.split(' ')[1]}`);
        this._commands[this._currentPageIndex].command();
    };

    // Handle the command from the user
    public handleCommand(command: string, pushHistory = true) {
        command = command.toLowerCase();
        command = command.trim();
        let pathName = command.split(' ')[1];

        for (const c of this._commands) {
            if (c.key === command) {
                if (pushHistory) {
                    window.history.pushState({}, document.title, `/${pathName}`);
                }

                c.command();
                return;
            }
        }

        if (pushHistory)
            this.commandHistory.push(command);

        this.displayError(`Command not found: ${command}`);
    }

    // Resets the command input element
    public resetCommandInput(commandInputEl: HTMLInputElement) {
        commandInputEl.value = "";
    }

    public async displayError(errorText: string) {
        this._helpPage.outro();
        this._errorPage.intro();
        errorMessage.update(m => m = errorText);
    }
}