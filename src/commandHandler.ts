import type { PageComponent } from "./types";

export class commandHandler {
    private _commands: { key: string, command: () => void }[] = [];
    private _helpEl: HTMLElement;
    private _errorEl: HTMLElement;
    commandHistory: string[] = [];

    private addCommand(key: string, command: () => void) {
        this._commands.push({ key, command });
    }

    private hideAll() {
        this._helpEl.style.display = "none";
        this._errorEl.style.display = "none";
    }

    constructor(commandInputEl: HTMLElement, helpEl: HTMLElement, errorEl: HTMLElement, homePage: PageComponent, reposPage: PageComponent) {
        this._helpEl = helpEl;
        this._errorEl = errorEl;
        let animation = "animate-bounce";

        this.addCommand("help", () => {
            // TODO: Transitions for errors and help
            this._errorEl.style.display = "none";
            this._helpEl.style.display = "block";
        });

        this.addCommand("display repos", async () => {
            this.hideAll();
            await homePage.outro();
            await reposPage.intro();

        });

        this.addCommand("display home", async () => {
            this.hideAll();
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