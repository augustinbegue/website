import type { PageComponent } from "./types";

export class commandHandler {
    private _commands: { key: string, command: () => void }[] = [];
    private _helpEl: HTMLElement;
    private _errorEl: HTMLElement;
    commandHistory: string[] = [];

    private addCommand(key: string, command: () => void) {
        this._commands.push({ key, command });
    }

    constructor(commandInputEl: HTMLElement, helpPage: PageComponent, errorPage: PageComponent, homePage: PageComponent, reposPage: PageComponent) {
        let animation = "animate-bounce";

        const hideAll = async () => {
            await helpPage.outro();
            await errorPage.outro();
        }

        this.addCommand("help", async () => {
            await hideAll();
            await helpPage.intro();
        });

        this.addCommand("display repos", async () => {
            hideAll();
            await homePage.outro();
            await reposPage.intro();

        });

        this.addCommand("display home", async () => {
            hideAll();
            await reposPage.outro();
            await homePage.intro();
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

    public displayError(errorText: string) {
        this._helpEl.style.display = "none";
        this._errorEl.innerText = errorText;
        this._errorEl.style.display = "block";
    }
}