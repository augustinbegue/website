<script lang="ts">
    import { onMount } from "svelte";

    import { fade } from "svelte/transition";

    import { commandHandler } from "./commandHandler";
    import Home from "./pages/Home.svelte";
    import Repos from "./pages/Repos.svelte";
    import type { PageComponent } from "./types";

    // Command Handler
    let commandInput: HTMLInputElement;

    let homePage: PageComponent;
    let reposPage: PageComponent;

    let pages: PageComponent[];

    let helpEl: HTMLElement;
    let errorEl: HTMLElement;
    let handler: commandHandler;

    // Animations
    let showCommandInput = false;

    const onIntroFinished = () => {
        // Command Handler
        showCommandInput = true;
    };

    const initCommandInput = () => {
        handler = new commandHandler(
            commandInput,
            helpEl,
            errorEl,
            homePage,
            reposPage,
        );
        commandInput.select();
        commandInput.focus();
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

<svelte:window
    on:keydown={(e) => {
        // if key pressed is arrow up
        if (e.key === "ArrowUp") {
            let command = "";
            if ((command = handler.commandHistory.pop()))
                commandInput.value = command;
        }

        if (document.activeElement != commandInput) {
            commandInput.select();
            commandInput.focus();
        }
    }}
/>

<div class="page-container">
    <div class="page">
        <Home {onIntroFinished} bind:this={homePage} />
        <Repos bind:this={reposPage} />
    </div>
</div>

<div class="w-screen p-8 z-10 absolute bottom-0 font-mono">
    <div class="bg-black m-4 p-4 text-white hidden rounded" bind:this={helpEl}>
        <p>Help:</p>
        <p>display [page] - displays the selected page</p>
        <ul>
            <li>-> home - home page</li>
            <li>-> repos - list of my github repos</li>
        </ul>
        <br />
        <p>help - displays this help page</p>
    </div>

    <div
        class=" bg-red-600 m-4 p-4 text-white hidden rounded"
        bind:this={errorEl}
    />

    {#if showCommandInput}
        <div
            id="commandline"
            class="w-full bg-black p-4 flex flex-row rounded"
            in:fade
            out:fade
            on:introend={initCommandInput}
        >
            <p class="text-white animate-pulse">$&nbsp;</p>
            <input
                type="text"
                placeholder="Type help for help..."
                class="w-full bg-black text-white outline-none border-none"
                bind:this={commandInput}
                on:keypress={(e) => {
                    // if key pressed is ENTER
                    if (e.key === "Enter") {
                        handler.handleCommand(commandInput.value);
                        commandInput.value = "";
                    }
                }}
            />
            <button
                on:click={prevPage}
                class="text-white px-2 hover:opacity-80 hover:text-black hover:bg-white transition-all rounded"
            >
                &#60;
            </button>
            <button
                on:click={nextPage}
                class="text-white px-2 hover:opacity-80 hover:text-black hover:bg-white transition-all rounded"
            >
                &#62;
            </button>
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
