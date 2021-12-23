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

<!-- TODO: Fix wierd behaviour where pages dont appear completely -->
<div class="page-container">
    <div class="page">
        <Home {onIntroFinished} bind:this={homePage} />
        <Repos bind:this={reposPage} />
        <Timeline bind:this={timelinePage} />
        <About bind:this={aboutPage} />
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

    .hovered {
        @apply ring-offset-1 ring-1 ring-offset-transparent ring-dark-200 dark:ring-dark-300;
    }

    .cursor {
        @apply absolute z-50 h-px w-px p-2 rounded-full bg-dark-500 dark:bg-dark-50 bg-opacity-80 transition-opacity duration-300 hovered;
    }

    .hoverable {
        @apply cursor-none rounded transition-all duration-300;
    }

    .page-container {
        @apply flex flex-row flex-nowrap w-screen h-screen dark:bg-dark-50 dark:text-white;
    }

    .page {
        @apply w-screen h-screen min-w-full min-h-screen flex-shrink-0 overflow-hidden;
    }

    .text-button {
        @apply text-white px-2 hover:opacity-80 hover:text-black hover:bg-dark-200 dark:hover:bg-dark-300 transition-all rounded hover:font-bold;
    }
</style>
