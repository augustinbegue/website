export class cursorTracker {
    private _cursor: HTMLElement;
    private _hovered: HTMLElement;

    constructor() {
        this._cursor = document.createElement("div");
        this._cursor.classList.add("cursor");
        document.body.appendChild(this._cursor);

        document.onmouseenter = (e) => {
            this._cursor.style.opacity = "0.8";
        }

        document.onmouseleave = (e) => {
            this._cursor.style.opacity = "0";
        }

        document.onmousemove = (e: MouseEvent) => {
            this._cursor.style.top = e.pageY + "px";
            this._cursor.style.left = e.pageX + "px";
        }

        document.onmouseover = (e: MouseEvent) => {
            let element = e.target as HTMLElement;

            while (element.parentElement && !element.classList.contains("hoverable")) {
                element = element.parentElement;
            }

            if (this._hovered)
                this._hovered.classList.remove("hovered");

            if (element.classList.contains("hoverable")) {
                if (element.tagName.toUpperCase() == "A" || element.tagName.toUpperCase() == "BUTTON") {
                    this._cursor.style.opacity = "0";
                } else {
                    this._cursor.style.opacity = "0.2";
                }

                element.classList.add("hovered");
                this._hovered = element;
            } else {
                this._cursor.style.opacity = "0.8";
            }
        }
    }
}