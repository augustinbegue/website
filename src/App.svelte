<script lang="ts">
    import { onMount } from "svelte";

    import { slide } from "svelte/transition";

    import { commandHandler } from "./commandHandler";
    import type { PageComponent } from "./types";

    import Home from "./pages/Home.svelte";
    import Repos from "./pages/Repos.svelte";
    import CommandInput from "./modules/CommandInput.svelte";
    import Help from "./modules/Help.svelte";
    import Error from "./modules/Error.svelte";

    // Command Handler
    let commandInput: HTMLInputElement;

    let homePage: PageComponent;
    let reposPage: PageComponent;
    let pages: PageComponent[];

    let helpPage: PageComponent;
    let errorPage: PageComponent;

    let handler: commandHandler;

    // Animations
    let showCommandInput = false;

    const onIntroFinished = () => {
        // Command Handler
        showCommandInput = true;
    };

    let errorMessage: string;
    let cc: {
        selectCommandInput: () => void;
    };
    const initCommandInput = () => {
        handler = new commandHandler(
            commandInput,
            helpPage,
            errorPage,
            homePage,
            reposPage,
        );
        cc.selectCommandInput();
    };

    onMount(() => {
        pages = [homePage, reposPage];
    });

    let currentPage = 0;
    const nextPage = async () => {
        await pages[currentPage].outro();
        currentPage = (currentPage + 1) % pages.length;
        pages[currentPage].intro();
    };
    const prevPage = async () => {
        await pages[currentPage].outro();
        currentPage = (currentPage - 1 + pages.length) % pages.length;
        pages[currentPage].intro();
    };
</script>

<div class="page-container">
    <div class="page">
        <Home {onIntroFinished} bind:this={homePage} />
        <Repos bind:this={reposPage} />
    </div>
</div>

<div class="w-screen p-8 z-10 absolute bottom-0 font-mono">
    {#if showCommandInput}
        <Help bind:this={helpPage} />
        <Error bind:this={errorPage} />

        <div in:slide out:slide on:introend={initCommandInput}>
            <CommandInput
                {commandInput}
                {handler}
                {prevPage}
                {nextPage}
                bind:this={cc}
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
        @variants responsive {
            /* Chrome, Safari and Opera */
            .no-scrollbar::-webkit-scrollbar {
                display: none;
            }

            .no-scrollbar {
                -ms-overflow-style: none; /* IE and Edge */
                scrollbar-width: none; /* Firefox */
            }
        }
    }

    body {
        background-attachment: fixed;
        padding: 0;
    }

    .page-container {
        @apply flex flex-row flex-nowrap w-screen h-screen;
    }

    .page {
        @apply w-screen h-screen min-w-full min-h-screen flex-shrink-0 overflow-hidden;
    }
</style>
