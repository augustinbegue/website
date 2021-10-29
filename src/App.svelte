<script lang="ts">
    import { onMount } from "svelte";
    import { Octokit } from "octokit";

    import { commandHandler } from "./commandHandler";

    let commandInput: HTMLInputElement;
    let homeEl: HTMLElement;
    let reposEl: HTMLElement;
    let helpEl: HTMLElement;
    let errorEl: HTMLElement;

    let handler: commandHandler;

    const octokit = new Octokit();

    let repos = [];

    onMount(() => {
        octokit.request({ url: "/users/augustinbegue/repos" }).then(
            (result) => {
                repos = result.data;
                repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
                console.log(repos);
            },
            (error) => {
                console.error(error);
            },
        );

        handler = new commandHandler(helpEl, reposEl, homeEl, errorEl);

        commandInput.select();
        commandInput.focus();
    });
</script>

<svelte:window
    on:keydown={(e) => {
        // if key pressed is arrow up
        if (e.key === "ArrowUp") {
            let command = "";
            if ((command = handler.commandHistory.pop()))
                commandInput.value = command;
        }
    }}
/>

<div
    class="container mx-auto p-4 h-screen w-screen flex items-center justify-center"
    bind:this={homeEl}
>
    <div class="text-center">
        <h1 class=" text-9xl pb-10 font-extrabold">Augustin</h1>
        <h2 class=" text-9xl font-extrabold">BÉGUÉ</h2>
    </div>
</div>
<div
    class="bg-gradient-to-bl from-green-500 to-blue-600 hidden"
    bind:this={reposEl}
>
    <div class="container mx-auto p-4">
        {#each repos as repo}
            <div
                class="frosted p-4 m-4 rounded transition-all cursor-pointer bg-white opacity-80 hover:opacity-100 text-black"
                on:click={() => {
                    window.open(repo.html_url, "_blank");
                }}
            >
                <a href={repo.html_url} target="_blank">{repo.name}</a>
                {repo.stargazers_count} stars
            </div>
        {/each}
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

    <div id="commandline" class="w-full bg-black p-4 flex flex-row rounded">
        <p>$&nbsp;</p>
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
    </div>
</div>

<style global lang="postcss">
    /* TODO: Change to:
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
    */
    @import "tailwindcss/base";
    @import "tailwindcss/components";
    @import "tailwindcss/utilities";

    body {
        background-attachment: fixed;
        padding: 0;
    }

    .backdrop-blur-lg {
        backdrop-filter: blur(16px);
    }

    .frosted::before {
        background: inherit;
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
        filter: blur(10px);
        z-index: -1;
    }

    .frosted {
        box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        position: relative;
        z-index: 1;
        background: inherit;
        overflow: hidden;
    }
</style>
