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
        let red = y * (width * 4) + x * 4;
        return {
            r: red,
            g: red + 1,
            b: red + 2,
            a: red + 3,
        };
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
                let src_indices = getColorIndicesForCoord(
                    xx + explosionKernelX[xx][yy],
                    yy + explosionKernelY[xx][yy],
                    width,
                );
                let res_indices = getColorIndicesForCoord(xx, yy, width);

                result.data[res_indices.r] = imgData.data[src_indices.r];
                result.data[res_indices.g] = imgData.data[src_indices.g];
                result.data[res_indices.b] = imgData.data[src_indices.b];
                result.data[res_indices.a] = imgData.data[src_indices.a];
            }
        }

        ctx.putImageData(result, startx, starty);
    }

    function resetImage() {
        let canvas = document.getElementById("me") as HTMLCanvasElement;
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let img = document.getElementById("meimg") as HTMLImageElement;
        ctx.drawImage(img, 0, 0);
    }

    onMount(async () => {
        await intro();
        new cursorTracker();
        let canvas = document.getElementById("me") as HTMLCanvasElement;
        let image = new Image();
        image.style.display = "none";
        image.src = me;
        image.id = "meimg";
        canvas.parentElement.prepend(image);

        image.onload = () => {
            resetImage();
        };

        let width = 400;
        let height = 400;
        let explosionKernelX = [];
        let explosionKernelY = [];

        for (let i = 0; i < width; i++) {
            explosionKernelX[i] = [];
            explosionKernelY[i] = [];
            for (let j = 0; j < height; j++) {
                explosionKernelX[i][j] = Math.floor(
                    Math.sin(i / (20.26 * Math.PI)) * (j / 20),
                );

                explosionKernelY[i][j] = Math.floor(
                    Math.sin(j / (20.26 * Math.PI)) * (i / 20),
                );
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
    <div class="container mx-auto md:pt-32 pt-8 pb-32">
        <div class="flex md:flex-row flex-col items-start justify-between">
            <div
                class="flex flex-col font-display md:w-auto w-full items-center"
            >
                <h1 class="md:text-8xl text-6xl font-bold tracking-wider mb-8">
                    Augustin
                </h1>
                <h1 class="md:text-9xl text-7xl font-black tracking-wide ">
                    BÉGUÉ
                </h1>
            </div>
            <div class="flex flex-row items-start">
                <canvas
                    id="me"
                    height="817"
                    width="1332"
                    style="height: auto; width: 100%;"
                />
                <button
                    class="social-button hoverable relative right-10"
                    on:click={() => {
                        resetImage();
                    }}><i class="fas fa-sync-alt " /></button
                >
            </div>
        </div>
        <div
            class="flex items-start md:justify-between justify-evenly pt-8 flex-wrap"
        >
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
                    window.open("https://instagram.com/tagueo", "_blank");
                }}
            >
                <i class="fab fa-instagram fa-2x" />
                <span>Instagram</span>
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
            <!-- TODO: Implement resume in firebase -->
            <button
                class="social-button hoverable"
                on:click={() => {
                    window.open("../static/CV.pdf", "_blank");
                }}
            >
                <i class="far fa-file fa-2x" />
                <span>Resume</span>
            </button>
        </div>
        <div class="container p-4 md:p-0">
            <h1 class="text-4xl md:text-5xl font-display font-bold">
                Who Am I
            </h1>
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
