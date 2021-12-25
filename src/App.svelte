<script lang="ts">
    import { onMount } from "svelte";
    import { slide } from "svelte/transition";
    import type { PageComponent } from "./global";
    import { commandHandler } from "./commandHandler";
    import { cursorTracker } from "./cursorTracker";

    import Home from "./pages/Home.svelte";
    import Repos from "./pages/Repos.svelte";
    import Timeline from "./pages/Timeline.svelte";
    import About from "./pages/About.svelte";
    import Projects from "./pages/Projects.svelte";

    import CommandInput from "./modules/CommandInput.svelte";
    import Help from "./modules/Help.svelte";
    import Error from "./modules/Error.svelte";

    // Command Handler
    let commandInput: HTMLInputElement;

    let homePage: PageComponent;
    let reposPage: PageComponent;
    let timelinePage: PageComponent;
    let aboutPage: PageComponent;
    let projectsPage: PageComponent;
    let pages: PageComponent[];

    let helpPage: PageComponent;
    let errorPage: PageComponent;

    let handler: commandHandler;

    // Animations
    let showCommandInput = false;

    const onIntroFinished = () => {
        // Command Handler
        showCommandInput = true;
        new cursorTracker();
    };

    let errorMessage: string;
    let ci: {
        selectCommandInput: () => void;
    };
    const initCommandInput = () => {
        ci.selectCommandInput();
    };

    onMount(() => {
        pages = [homePage, aboutPage, projectsPage, timelinePage, reposPage];
        handler = new commandHandler(commandInput, helpPage, errorPage, pages);
    });
</script>

<canvas
    id="imgcv"
    height="500"
    width="500"
    style="position: absolute; top: 0px;"
/>

<!-- TODO: Fix wierd behaviour where pages dont appear completely -->
<div class="page-container">
    <div class="page">
        <!-- <Home {onIntroFinished} bind:this={homePage} />
        <Repos bind:this={reposPage} />
        <Timeline bind:this={timelinePage} />
        <About bind:this={aboutPage} /> -->
        <Projects bind:this={projectsPage} />
    </div>
</div>

<div class="w-screen p-8 z-50 absolute bottom-0 font-mono">
    <Help bind:this={helpPage} />
    <Error bind:this={errorPage} />
    {#if showCommandInput}
        <div in:slide out:slide on:introend={initCommandInput}>
            <CommandInput
                {commandInput}
                {handler}
                prevPage={handler.prevPage}
                nextPage={handler.nextPage}
                bind:this={ci}
            />
        </div>
    {/if}
</div>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    @tailwind screens;

    @layer utilities {
        /* Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
            display: none;
        }

        .no-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
        }
    }

    body {
        overflow: hidden;
        background-attachment: fixed;
        padding: 0;
    }

    .needed {
        @apply bg-opacity-0 bg-opacity-80;
    }

    /* ============================================================ */
    /*                        Cursor Logic                          */
    /* ============================================================ */

    .hovered {
        @apply ring-offset-1 ring-1 ring-offset-transparent ring-dark-200 dark:ring-dark-300;
    }

    .cursor {
        @apply absolute z-50 h-px w-px p-2 rounded-full bg-dark-500 dark:bg-dark-50 transition-opacity duration-300 hovered;
        animation: rotate-360 1s linear infinite,
            text-onedark-rainbow 10s linear infinite;
    }

    .hoverable {
        @apply cursor-none rounded transition-all duration-300;
    }

    .cursor span {
        @apply font-mono absolute w-5 left-0 top-0 text-sm;
        transform-origin: bottom center;
    }

    /* ============================================================ */
    /*                        Page Comtainers                       */
    /* ============================================================ */

    .page-container {
        @apply flex flex-row flex-nowrap w-screen h-screen dark:bg-dark-50 dark:text-white;
    }

    .page {
        @apply w-screen h-screen min-w-full min-h-screen flex-shrink-0 overflow-hidden;
    }

    /* ============================================================ */
    /*                        Utilities                             */
    /* ============================================================ */

    .text-button {
        @apply text-white px-2 hover:opacity-80 hover:text-black hover:bg-dark-200 dark:hover:bg-dark-300 transition-all rounded hover:font-bold;
    }

    /* ============================================================ */
    /*             Constant Rotation Animation                      */
    /* ============================================================ */

    .animation-rotate-360 {
        animation: rotate-360 1s linear infinite;
    }

    @keyframes rotate-360 {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(-360deg);
        }
    }

    /* ============================================================ */
    /*                  Rainbow Color Animation                     */
    /* ============================================================ */

    .animation-onedark-rainbow {
        animation: onedark-rainbow 10s linear infinite;
    }

    @keyframes onedark-rainbow {
        0% {
            background-color: #56b6c2;
        }
        15% {
            background-color: #61afef;
        }
        30% {
            background-color: #c678dd;
        }
        45% {
            background-color: #e06c75;
        }
        60% {
            background-color: #e5c07b;
        }
        75% {
            background-color: #98c379;
        }
        100% {
            background-color: #56b6c2;
        }
    }

    @keyframes text-onedark-rainbow {
        0% {
            color: #56b6c2;
        }
        15% {
            color: #61afef;
        }
        30% {
            color: #c678dd;
        }
        45% {
            color: #e06c75;
        }
        60% {
            color: #e5c07b;
        }
        75% {
            color: #98c379;
        }
        100% {
            color: #56b6c2;
        }
    }

    /* ============================================================ */
    /*                     Marquee Animation                        */
    /* ============================================================ */

    .wrapper {
        max-width: 100%;
        overflow: hidden;
    }

    .marquee {
        position: relative;
        white-space: nowrap;
        overflow: hidden;
        animation: marquee 200s linear infinite;
        display: flex;
        align-items: flex-start;
        justify-content: start;
        flex-wrap: nowrap;
    }

    @keyframes marquee {
        0% {
            transform: translate3d(0, 0, 0);
        }
        100% {
            transform: translate3d(-50%, 0, 0);
        }
    }
</style>
