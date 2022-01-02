<script lang="ts">
    import { onMount } from "svelte";
    import { cursorTracker } from "../cursorTracker";

    import me from "../assets/me.png";

    let display = false;

    export function intro() {
        return new Promise<void>((resolve) => {
            display = true;
            resolve();
        });
    }

    export function outro() {
        return new Promise<void>((resolve) => {
            display = false;
            resolve();
        });
    }

    function getColorIndicesForCoord(x, y, width) {
        var red = y * (width * 4) + x * 4;
        return [red, red + 1, red + 2, red + 3];
    }

    function explodeAtCoordinates(
        x,
        y,
        width,
        height,
        explosionKernelX,
        explosionKernelY,
    ) {
        let canvas = document.getElementById("me") as HTMLCanvasElement;
        let ctx = canvas.getContext("2d");

        let startx = x - width / 2;
        let starty = y - height / 2;

        let imgData = ctx.getImageData(startx, starty, width, height);
        let result = ctx.createImageData(width, height);

        for (let xx = 0; xx < width; xx++) {
            for (let yy = 0; yy < height; yy++) {
                let indices = getColorIndicesForCoord(
                    xx + explosionKernelX,
                    yy + explosionKernelY,
                    width,
                );
                const [redIndex, greenIndex, blueIndex, alphaIndex] = indices;

                if (redIndex < 0) {
                    continue;
                } else if (alphaIndex >= imgData.data.length) {
                    continue;
                }

                result.data[redIndex] = imgData.data[redIndex];
                result.data[greenIndex] = imgData.data[greenIndex];
                result.data[blueIndex] = imgData.data[blueIndex];
                result.data[alphaIndex] = 255;
            }
        }

        ctx.putImageData(result, startx, starty);
    }

    onMount(async () => {
        await intro();
        new cursorTracker();
        let canvas = document.getElementById("me") as HTMLCanvasElement;
        let ctx = canvas.getContext("2d");

        let image = new Image();
        image.style.display = "none";
        image.src = me;
        canvas.parentElement.prepend(image);
        ctx.drawImage(image, 0, 0, 1332, 817);

        let width = 100;
        let height = 100;
        let explosionKernelX = [];
        let explosionKernelY = [];

        for (let i = 0; i < width; i++) {
            explosionKernelX[i] = [];
            explosionKernelY[i] = [];
            for (let j = 0; j < height; j++) {
                explosionKernelX[i][j] = -1;
                explosionKernelY[i][j] = -1;
            }
        }

        canvas.onmousedown = (event: MouseEvent) => {
            var rect = canvas.getBoundingClientRect(), // abs. size of element
                scaleX = canvas.width / rect.width, // relationship bitmap vs. element for X
                scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y

            explodeAtCoordinates(
                (event.clientX - rect.left) * scaleX,
                (event.clientY - rect.top) * scaleY,
                width,
                height,
                explosionKernelX,
                explosionKernelY,
            );
        };
    });
</script>

{#if display}
    <div class="container mx-auto pt-32 pb-32">
        <div class="flex items-start justify-between">
            <div class="flex flex-col items-start font-display">
                <h1 class="text-8xl font-bold tracking-wider mb-8">Augustin</h1>
                <h1 class="text-9xl font-black tracking-wide ">BÉGUÉ</h1>
            </div>
            <div>
                <canvas
                    id="me"
                    height="817"
                    width="1332"
                    style="height: auto; width: 100%;"
                />
            </div>
        </div>
        <div class="flex items-start justify-between pt-8">
            <button
                class="social-button hoverable"
                on:click={() => {
                    window.open("https://github.com/augustinbegue", "_blank");
                }}
            >
                <i class="fab fa-github fa-2x" />
                <span>GitHub</span>
            </button>
            <button
                class="social-button hoverable"
                on:click={() => {
                    window.open("https://instagram.com/tagueo", "_blank");
                }}
            >
                <i class="fab fa-instagram fa-2x" />
                <span>Instagram</span>
            </button>
            <button
                class="social-button hoverable"
                on:click={() => {
                    window.open(
                        "https://www.linkedin.com/in/augustin-b%C3%A9gu%C3%A9/",
                        "_blank",
                    );
                }}
            >
                <i class="fab fa-linkedin fa-2x" />
                <span>Linkedin</span>
            </button>
            <button
                class="social-button hoverable"
                on:click={() => {
                    window.open("mailto://augustin.begue@epita.fr", "_blank");
                }}
            >
                <i class="far fa-envelope fa-2x" />
                <span>Mail</span>
            </button>
        </div>
    </div>
{/if}

<style lang="postcss">
    .social-button {
        @apply p-1 m-1 flex justify-center items-center text-dark-100 hover:text-dark-50 dark:text-dark-400 dark:hover:text-dark-500 font-mono;
    }

    .social-button span {
        @apply ml-2;
    }
</style>
