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

        this.addCommand("help", async () => {
            await errorPage.outro();
            await helpPage.intro();
        });

        this.addCommand("display home", async () => {
            this.hideAll();
            await this._currentPage.outro();
            await pages[0].intro();
            this._currentPage = pages[0];
            this._currentPageIndex = 0;
        });

        this.addCommand("display about", async () => {
            this.hideAll();
            await this._currentPage.outro();
            await pages[1].intro();
            this._currentPage = pages[1];
            this._currentPageIndex = 1;
        });

        this.addCommand("display projects", async () => {
            this.hideAll();
            await this._currentPage.outro();
            await pages[2].intro();
            this._currentPage = pages[2];
            this._currentPageIndex = 2;
        });

        this.addCommand("display timeline", async () => {
            this.hideAll();
            await this._currentPage.outro();
            await pages[3].intro();
            this._currentPage = pages[3];
            this._currentPageIndex = 3;
        });

        this.addCommand("display repos", async () => {
            this.hideAll();
            await this._currentPage.outro();
            await pages[4].intro();
            this._currentPage = pages[4];
            this._currentPageIndex = 4;
        });
    }

    public nextPage = async () => {
        await this.pages[this._currentPageIndex].outro();
        this._currentPageIndex = (this._currentPageIndex + 1) % this.pages.length;
        this.pages[this._currentPageIndex].intro();
        this._currentPage = this.pages[this._currentPageIndex];
    };
    public prevPage = async () => {
        await this.pages[this._currentPageIndex].outro();
        this._currentPageIndex = (this._currentPageIndex - 1 + this.pages.length) % this.pages.length;
        this.pages[this._currentPageIndex].intro();
        this._currentPage = this.pages[this._currentPageIndex];
    };

    // Handle the command from the user
    public handleCommand(command: string) {
        this.commandHistory.push(command);

        for (const c of this._commands) {
            if (c.key === command) {
                c.command();
                return;
            }
        }

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