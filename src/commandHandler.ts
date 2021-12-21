import type { PageComponent } from "./types";
import { errorMessage } from "./stores";

export class commandHandler {
    private _commands: { key: string, command: () => void }[] = [];
    commandHistory: string[] = [];
    _helpPage: PageComponent;
    _errorPage: PageComponent;
    private _currentPage: PageComponent;

    private addCommand(key: string, command: () => void) {
        this._commands.push({ key, command });
    }

    public async hideAll() {
        this._helpPage.outro();
        await this._errorPage.outro();
    }

    constructor(commandInputEl: HTMLElement, helpPage: PageComponent, errorPage: PageComponent, homePage: PageComponent, reposPage: PageComponent, timelinePage: PageComponent, aboutPage: PageComponent, projectsPage: PageComponent) {
        this._helpPage = helpPage;
        this._errorPage = errorPage;
        this._currentPage = homePage;

        this.addCommand("help", async () => {
            await errorPage.outro();
            await helpPage.intro();
        });

        this.addCommand("display repos", async () => {
            this.hideAll();
            await this._currentPage.outro();
            await reposPage.intro();
            this._currentPage = reposPage;

        });

        this.addCommand("display home", async () => {
            this.hideAll();
            await this._currentPage.outro();
            await homePage.intro();
            this._currentPage = homePage;
        });

        this.addCommand("display timeline", async () => {
            this.hideAll();
            await this._currentPage.outro();
            await timelinePage.intro();
            this._currentPage = timelinePage;
        });

        this.addCommand("display about", async () => {
            this.hideAll();
            await this._currentPage.outro();
            await aboutPage.intro();
            this._currentPage = aboutPage;
        });

        this.addCommand("display projects", async () => {
            this.hideAll();
            await this._currentPage.outro();
            await projectsPage.intro();
            this._currentPage = projectsPage;
        });
    }

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