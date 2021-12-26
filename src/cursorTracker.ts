function setImage(img) {
    img.crossOrigin = "Anonymous";
    let canvas = document.getElementById("imgcv") as HTMLCanvasElement;
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    let context = canvas.getContext('2d');
    context.drawImage(img, 0, 0);
}

function getPixel(x, y, size) {
    let canvas = document.getElementById("imgcv") as HTMLCanvasElement;
    let context = canvas.getContext('2d');

    // Compute average color of the square containing the pixel
    let imgData = context.getImageData(x, y, 100, 100).data;
    let r = 0, g = 0, b = 0;
    for (let i = 0; i < imgData.length; i += 4) {
        r += imgData[i];
        g += imgData[i + 1];
        b += imgData[i + 2];
    }

    r = Math.floor(r / (imgData.length / 4));
    g = Math.floor(g / (imgData.length / 4));
    b = Math.floor(b / (imgData.length / 4));

    return [r, g, b];
}

export class cursorTracker {
    private _cursor: HTMLElement;
    private _hovered: HTMLElement;
    private _displayingText: boolean = false;
    private _spans: { spans: HTMLSpanElement[], text: string }[] = [];

    constructor() {
        this._cursor = document.createElement("div");
        this._cursor.classList.add("cursor");
        document.body.appendChild(this._cursor);

        document.onmouseenter = (e) => {
            this._cursor.style.setProperty("--tw-bg-opacity", "0.8");
            this._cursor.style.setProperty("--tw-ring-opacity", "0.8");
        }

        document.onmouseleave = (e) => {
            this._cursor.style.setProperty("--tw-bg-opacity", "0");
            this._cursor.style.setProperty("--tw-ring-opacity", "0");
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
                if (element.tagName.toUpperCase() === "A" || element.tagName.toUpperCase() === "BUTTON") {
                    this._cursor.style.setProperty("--tw-bg-opacity", "0");
                    this._cursor.style.setProperty("--tw-ring-opacity", "0");
                } else {
                    this._cursor.style.setProperty("--tw-bg-opacity", "0.2");
                    this._cursor.style.setProperty("--tw-ring-opacity", "0.2");
                }

                element.classList.add("hovered");
                this._hovered = element;
            } else {
                this._cursor.style.setProperty("--tw-bg-opacity", "0.8");
                this._cursor.style.setProperty("--tw-ring-opacity", "0.8");
            }
        }
    }

    displayText(text: string) {
        this._displayingText = true;

        let rotationAmount = 360 / text.length;
        let height = Math.max(2, text.length / 10);

        let spansI = this._spans.length;
        this._spans.push({ spans: [], text });

        let i = 0;
        let interval = setInterval(() => {
            if (i >= text.length || !this._spans[spansI]) {
                clearInterval(interval);
            }
            else {

                this._spans[spansI].spans.push(document.createElement("span"));
                this._spans[spansI].spans[i].innerText = text[i];
                this._spans[spansI].spans[i].style.transform = `translateY(-${height - 0.5}rem) translateX(-0.125rem) rotate(${i * rotationAmount}deg)`;
                this._spans[spansI].spans[i].style.height = `${height}rem`;
                this._cursor.appendChild(this._spans[spansI].spans[i]);
                this._cursor.style.animationDuration = `${height * 2}s`;
                i++;
            }
        }, 10);
    }

    hideText() {
        this._displayingText = false;

        // No text to hide
        if (this._spans.length === 0)
            return;

        let spans = this._spans.pop().spans;
        let spansLen = spans.length;

        let i = 0;
        let interval = setInterval(() => {
            if (i >= spansLen) {
                clearInterval(interval);
            } else {
                spans[i].remove();
                i++;
            }
        }, 10);
    }
}