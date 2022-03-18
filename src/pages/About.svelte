<script lang="ts">
    import { fade, slide, blur } from "svelte/transition";

    import me from "../assets/me.png";
    import typescript from "../assets/typescript.svg";
    import c from "../assets/c.svg";
    import csharp from "../assets/c_sharp.svg";
    import angular from "../assets/angular.svg";
    import firebase from "../assets/firebase.svg";
    import svelte from "../assets/svelte.svg";
    import electron from "../assets/electron.svg";
    import react from "../assets/react.svg";
    import { onMount } from "svelte";
    import type { cursorTracker } from "../cursorTracker";
    import type { Experience } from "../global";
    import {
        collection,
        getDocs,
        orderBy,
        query,
        QuerySnapshot,
    } from "firebase/firestore";
    import { firestore } from "../main";

    let display = false;
    export let ctr: cursorTracker;

    let experiences: Experience[] = [];
    let experiencePromise: Promise<Experience[]>;

    onMount(() => {
        const experienceQuery = query(
            collection(firestore, "experience"),
            orderBy("date", "desc"),
        );

        experiencePromise = new Promise(async (resolve, reject) => {
            let snapshot = (await getDocs(
                experienceQuery,
            )) as QuerySnapshot<Experience>;

            snapshot.forEach((doc) => {
                experiences.push(doc.data());
            });

            resolve(experiences);
        });
    });

    function initCanvas() {
        let canvas = document.getElementById("me") as HTMLCanvasElement;
        let image = new Image();
        image.style.display = "none";
        image.src = me;
        image.id = "meimg";
        canvas.append(image);

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
    }

    function resetImage() {
        let canvas = document.getElementById("me") as HTMLCanvasElement;
        let ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        let img = document.getElementById("meimg") as HTMLImageElement;
        ctx.drawImage(img, 0, 0);
    }

    export function intro() {
        return new Promise<void>((resolve) => {
            display = true;
            setTimeout(() => {
                resolve();
            }, 400);
        });
    }

    export function outro() {
        return new Promise<void>((resolve) => {
            display = false;
            setTimeout(() => {
                resolve();
            }, 400);
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

    function toggleContent(e: MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        let target = e.target as HTMLElement;
        let content = target.getAttribute("content");
        target.setAttribute("content", target.innerHTML);
        target.innerHTML = content;
    }
</script>

{#if display}
    <div class="container mx-auto md:pt-32 pt-8 pb-64">
        <div class="flex md:flex-row flex-col items-start justify-between">
            <div
                class="flex flex-col font-display md:w-auto w-full items-center"
                transition:blur
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
                    class="w-full md:w-auto md:max-h-[30vh]"
                    transition:blur
                    on:introstart={() => initCanvas()}
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
            transition:slide
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
        <div class="container pt-16">
            <div
                class="flex flex-col-reverse md:flex-row justify-between"
                transition:slide
            >
                <p
                    class="px-4 md:px-0 font-mono text-lg md:text-xl text-dark-100 dark:text-dark-500"
                >
                    Hi, I'm Augustin, a 19yo aspiring engineer from Paris,
                    France. Currently, I'm 2nd year student at <a
                        href="https://epita.fr"
                        class="hoverable">EPITA</a
                    >
                    where I learn maths & computer science to obtain an engineering
                    degree. I'm also a self-taught web developer. On my free time,
                    I enjoy cycling and am a Formula 1 and
                    <span
                        on:mouseenter={() =>
                            ctr.displayText("aka soccer for americans... ")}
                        on:mouseleave={() => ctr.hideText()}>football</span
                    > fan.
                </p>
                <h1
                    class="px-4 md:pr-0 md:pl-64 text-3xl md:text-5xl font-display font-bold flex-shrink-0"
                >
                    Who Am I
                </h1>
            </div>
            <div
                class="flex flex-col md:flex-row justify-between pt-16"
                transition:slide
            >
                <div class=" md:max-w-[35vw]">
                    <h1
                        class="px-4 md:px-0 text-3xl md:text-5xl font-display font-bold"
                    >
                        Skillz
                    </h1>
                    <p
                        class="px-4 pt-4 md:px-0 font-mono text-base md:text-lg text-dark-100 dark:text-dark-500"
                    >
                        While I'm familiar with and like languages like C and
                        C#, designing and building webapps is what I enjoy the
                        most for the moment.
                    </p>
                    <div class="font-mono my-8 px-4 md:px-0 ">
                        <h2
                            class="text-xl md:text-2xl font-display font-bold text-white hidden md:block"
                        >
                            Other things I can do
                        </h2>
                        <div class="my-2 flex flex-wrap">
                            {#each ["web scraping", "image processing", "ocr", "rest API", "PWA", "unity", "asp.net"] as tag}
                                <span
                                    class="m-1 md:px-4 px-3 md:py-1 rounded-full animation-onedark-rainbow text-dark-50 whitespace-nowrap md:text-base text-sm"
                                    >{tag}</span
                                >
                            {/each}
                        </div>
                    </div>
                </div>
                <!-- TODO: Implement in firebase -->
                <div
                    class="w-full px-4 md:pr-0 lg:pl-32 grid grid-cols-2 gap-4"
                >
                    <div
                        class="skill hoverable"
                        style="--color: #61AFEF; --progress: 80%;"
                        on:mouseleave={() => ctr.hideText()}
                        on:mouseenter={() => {
                            ctr.displayText(
                                "nodejs / discord.js / express.js / ",
                            );
                        }}
                    >
                        <span>
                            <img src={typescript} />
                            <span>TypeScript</span>
                        </span>
                        <span>4y+</span>
                    </div>
                    <div
                        class="skill"
                        style="--color: #E06C75; --progress: 70%;"
                    >
                        <span>
                            <img src={angular} />
                            <span>Angular</span>
                        </span>
                        <span>4y+</span>
                    </div>
                    <div
                        class="skill"
                        style="--color: #3B94DD; --progress: 65%;"
                    >
                        <span>
                            <i class="fas fa-database text-blue-500 fa-2x" />
                            <span>SQL</span>
                        </span>
                        <span>4y+</span>
                    </div>
                    <div
                        class="skill"
                        style="--color: #464B57; --progress: 60%;"
                    >
                        <span>
                            <img src={electron} />
                            <span>Electron</span>
                        </span>
                        <span>2y</span>
                    </div>
                    <div
                        class="skill"
                        style="--color: #E5C07B; --progress: 60%;"
                    >
                        <span>
                            <img src={firebase} />
                            <span>Firebase</span>
                        </span>
                        <span>2y+</span>
                    </div>
                    <div
                        class="skill hoverable"
                        style="--color: #98C379; --progress: 55%;"
                        on:mouseleave={() => ctr.hideText()}
                        on:mouseenter={() => {
                            ctr.displayText("Unity / ASP.NET / .NET Core / ");
                        }}
                    >
                        <span>
                            <img src={csharp} />
                            <span>C#</span>
                        </span>
                        <span>2y</span>
                    </div>
                    <div
                        class="skill"
                        style="--color: #4DA1E6; --progress: 50%;"
                    >
                        <span>
                            <img src={c} />
                            <span>C</span>
                        </span>
                        <span>1y</span>
                    </div>
                    <div
                        class="skill"
                        style="--color: #ff7b2e; --progress: 45%;"
                    >
                        <span>
                            <img src={svelte} />
                            <span>Svelte</span>
                        </span>
                        <span>8mo+</span>
                    </div>
                    <div
                        class="skill"
                        style="--color: #56B6C2; --progress: 20%;"
                    >
                        <span>
                            <img src={react} />
                            <span>React</span>
                        </span>
                        <span>6mo+</span>
                    </div>
                </div>
            </div>

            <div
                class="flex flex-col md:flex-row justify-between pt-16 flex-wrap"
                transition:fade
            >
                <h1
                    class="px-4 md:px-0 mt-8 text-3xl md:text-5xl font-display font-bold"
                >
                    Experience
                </h1>
                {#await experiencePromise}
                    <div
                        class="z-30 flex justify-center items-center w-full py-8"
                    >
                        <i class="fas fa-circle-notch fa-spin fa-2x" />
                    </div>
                {:then experiences}
                    {#each experiences as experience}
                        <div class="experience md:m-0 m-4">
                            <span class="text-xl font-semibold font-display">
                                {experience.title}
                            </span>
                            <span class="font-mono">
                                {experience.duration} |
                                {#each experience.tags as tag}
                                    <span
                                        class="m-1 px-3 rounded-full animation-onedark-rainbow text-dark-50 text-sm"
                                        >{tag}</span
                                    >
                                {/each}
                                | {experience.type} |
                                <span class="text-sm">
                                    <span class="text-gray-500">
                                        <i class="fas fa-map-marker-alt" />
                                        {experience.location}
                                    </span>
                                </span>
                            </span>
                        </div>
                    {/each}
                {/await}
            </div>
        </div>
    </div>
{/if}

<style lang="postcss">
    a {
        @apply underline;
    }

    .experience {
        @apply text-dark-100 rounded dark:text-dark-500 border-dashed border-y-2 border-dark-50/25 dark:border-dark-500/25 flex flex-col py-4 flex-shrink-0 mt-8;
    }

    .skill {
        @apply flex justify-between items-start font-mono text-dark-100 rounded dark:text-dark-300  bg-dark-400 dark:bg-dark-100 border-dashed border-y-2 border-dark-50/25 dark:border-dark-500/25 min-w-[160px];
        background: linear-gradient(
            90deg,
            var(--color) 0%,
            var(--color) var(--progress),
            rgba(255, 0, 0, 0) var(--progress),
            rgba(255, 0, 0, 0) 100%
        );
    }

    .skill > span:nth-child(1) {
        @apply flex flex-nowrap h-full items-center justify-center;
    }

    .skill > span:nth-child(2) {
        @apply h-full flex items-center justify-center;
    }

    .skill > span > img {
        @apply rounded w-auto h-8 m-1;
    }
    .skill > span > i {
        @apply flex items-center justify-center m-1;
    }

    .skill > span > span {
        @apply h-full mix-blend-difference flex items-center justify-center;
    }

    .social-button {
        @apply p-1 m-1 flex justify-center items-center text-dark-100 hover:text-dark-50 dark:text-dark-400 dark:hover:text-dark-500 font-mono;
    }

    .social-button span {
        @apply ml-2;
    }
</style>
