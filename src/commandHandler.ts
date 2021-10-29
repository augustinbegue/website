export class commandHandler {
    private _commands: { key: string, command: () => void }[] = [];
    private _helpEl: HTMLElement;
    private _reposEl: HTMLElement;
    private _homeEl: HTMLElement;
    private _errorEl: HTMLElement;
    commandHistory: string[] = [];

    private addCommand(key: string, command: () => void) {
        this._commands.push({ key, command });
    }

    private hideAll() {
        this._helpEl.style.display = "none";
        this._reposEl.style.display = "none";
        this._homeEl.style.display = "none";
        this._errorEl.style.display = "none";
    }

    constructor(helpEl: HTMLElement, reposEl: HTMLElement, homeEl: HTMLElement, errorEl: HTMLElement) {
        this._helpEl = helpEl;
        this._reposEl = reposEl;
        this._homeEl = homeEl;
        this._errorEl = errorEl;

        // TODO: Proper transitions between pages
        this.addCommand("help", () => {
            this._errorEl.style.display = "none";
            this._helpEl.style.display = "block";
        });

        this.addCommand("display repos", () => {
            this.hideAll();
            this._reposEl.style.display = "block";
        });

        this.addCommand("display home", () => {
            this.hideAll();
            this._homeEl.style.display = "block";
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