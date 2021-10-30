<script lang="ts">
    import { onMount } from "svelte";
    import { Octokit } from "octokit";
    import Typed from "typed.js";

    import { commandHandler } from "./commandHandler";

    // Command Handler
    let commandInput: HTMLInputElement;
    let homeEl: HTMLElement;
    let homeLoadingEl: HTMLElement;
    let homeLoadingBarEl: HTMLElement;
    let homeTextEl: HTMLElement;
    let reposEl: HTMLElement;
    let helpEl: HTMLElement;
    let errorEl: HTMLElement;
    let handler: commandHandler;

    // Octokit
    const octokit = new Octokit();
    let repos = [];

    const animationStep1 = () => {
        // Typed.js
        let typedContainer = document.querySelector("#typed1").parentElement;
        new Typed("#typed1", {
            stringsElement: "#typed1Elements",
            typeSpeed: 0,
            onStringTyped: () => {
                typedContainer.style.display = "none";
                animationStep2();
            },
        });
    };

    const animationStep2 = () => {
        homeLoadingEl.style.display = "flex";

        let progress = 0;
        let interval = setInterval(() => {
            progress += 1;
            homeLoadingBarEl.style.width = `${progress}%`;
            if (progress >= 100) {
                homeLoadingEl.style.display = "none";
                homeTextEl.style.display = "flex";
                animationStep3();
                clearInterval(interval);
            }
        }, 10);
    };

    const animationStep3 = () => {
        // Command Handler
        handler = new commandHandler(helpEl, reposEl, homeEl, errorEl);
        commandInput.parentElement.style.display = "flex";
        commandInput.select();
        commandInput.focus();
    };

    onMount(() => {
        // Octokit
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

        animationStep1();
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

<div bind:this={homeEl}>
    <div class=" font-mono text-left">
        <span id="typed1Elements">
            <p>
                `> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                    class="font-bold">Cleaning</span
                >
                Previous Greeting Sequences ...
                <br />` `> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                    class="font-bold">Mounting</span
                >
                Temporary File Manager ...
                <br />` `> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                    class="font-bold">Initializing</span
                >
                Greeting Sequence ...
                <br />` ^500 `> [ <span class="text-green-500">OK</span> ]
                <span class="font-bold">Reached Target</span>
                Temporary File Manager Ready
                <br />` `> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                    class="font-bold">Starting</span
                >
                Network Manager ...
                <br />` `> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                    class="font-bold">Starting</span
                >
                Graphical Interface ...
                <br />` `> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                    class="font-bold">Loading</span
                >
                Fonts ...
                <br />` `> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                    class="font-bold">Loading</span
                >
                Styles ...
                <br />` `> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                    class="font-bold">Loading</span
                >
                Assets ...
                <br />` ^500 `> [ <span class="text-green-500">OK</span> ]
                <span class="font-bold">Loaded</span>
                Fonts
                <br />` `> [ <span class="text-green-500">OK</span> ]
                <span class="font-bold">Loaded</span>
                Styles
                <br />` `> [ <span class="text-green-500">OK</span> ]
                <span class="font-bold">Loaded</span>
                Assets
                <br />` ^100 `> [ <span class="text-green-500">OK</span> ]
                <span class="font-bold">Reached Target</span>
                Network Manager Ready
                <br />` `>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span class="font-bold">Downloading</span>
                Name
                <br />` `>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span class="font-bold">Downloading</span>
                Age
                <br />` `>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span class="font-bold">Downloading</span>
                Repos
                <br />` `>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span class="font-bold">Downloading</span>
                Social Networks
                <br />` ^400 `> [ <span class="text-green-500">OK</span> ]
                <span class="font-bold">Downloaded</span>
                Name
                <br />` `> [ <span class="text-green-500">OK</span> ]
                <span class="font-bold">Downloaded</span>
                Age
                <br />` `> [ <span class="text-green-500">OK</span> ]
                <span class="font-bold">Downloaded</span>
                Repos
                <br />` `> [ <span class="text-green-500">OK</span> ]
                <span class="font-bold">Downloaded</span>
                Social Networks
                <br />` `> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                    class="font-bold">Starting</span
                >
                Greeting Animation Manager ...
                <br />` `> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                    class="font-bold">Starting</span
                >
                Command Line Interpreter ...
                <br />` ^200 `> [ <span class="text-green-500">OK</span> ]
                <span class="font-bold">Reached Target</span>
                Greeting Animation Manager Ready
                <br />` `> [ <span class="text-green-500">OK</span> ]
                <span class="font-bold">Reached Target</span>
                Command Line Interpreter Ready
                <br />` `> [ <span class="text-green-500">OK</span> ]
                <span class="font-bold">Reached Target</span>
                Graphical Interface Ready
                <br />` `> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                    class="font-bold">Loading</span
                >
                Page Home
                <br />` `> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                    class="font-bold">Loading</span
                >
                Page Repos
                <br />` `> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span
                    class="font-bold">Loading</span
                >
                Page Social
                <br />` ^400 `> [ <span class="text-green-500">OK</span> ]
                <span class="font-bold">Loaded</span>
                Page Home
                <br />` `> [ <span class="text-green-500">OK</span> ]
                <span class="font-bold">Loaded</span>
                Page Repos
                <br />` `> [ <span class="text-green-500">OK</span> ]
                <span class="font-bold">Loaded</span>
                Page Social
                <br />` `> [ <span class="text-green-500">OK</span> ]
                <span class="font-bold">Reached Target</span>
                Pages Loaded
                <br />` `> [ <span class="text-green-500">OK</span> ]
                <span class="font-bold">Reached Target</span>
                Greeting Sequence Initialized
                <br />` ^1000
                <br />
            </p>
        </span>
        <span id="typed1" />
    </div>
    <div
        class="container mx-auto p-4 h-screen w-screen hidden items-center justify-center flex-col"
        bind:this={homeLoadingEl}
    >
        <span class="flex">
            <h1
                class="relative text-9xl pb-10 font-extrabold"
                style="left: 20px"
            >
                A
            </h1>
            <h1
                class="relative text-9xl pb-10 font-extrabold"
                style="right: 20px;"
            >
                B
            </h1>
        </span>
        <div class="relative pt-1 w-1/4">
            <div
                class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-400"
            >
                <div
                    style="width:0%"
                    class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-bl from-green-500 to-blue-600 "
                    bind:this={homeLoadingBarEl}
                />
            </div>
        </div>
    </div>
    <div
        class="container mx-auto p-4 h-screen w-screen hidden items-center justify-center"
        bind:this={homeTextEl}
    >
        <div class="text-center">
            <h1 class=" text-9xl pb-10 font-extrabold">Augustin</h1>
            <h2 class=" text-9xl font-extrabold">BÉGUÉ</h2>
            <h4 class=" text-base font-medium">19 yo</h4>
            <h4 class=" text-base font-medium">student @ Epita</h4>
            <h4 class=" text-base font-medium">Paris, France</h4>
        </div>
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

    <div id="commandline" class="w-full bg-black p-4 hidden flex-row rounded">
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
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

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
