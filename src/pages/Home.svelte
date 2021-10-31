<script lang="ts">
    import { onMount } from "svelte";
    import { fade, slide, fly } from "svelte/transition";
    import { expoIn, expoOut } from "svelte/easing";
    import Typed from "typed.js";

    let showStep1 = true;
    let showStep2 = false;
    let showStep3 = false;

    let showStep3Name = false;
    let showStep3SurName = false;
    let showStep3Info = false;

    let homeLoadingBarEl: HTMLElement;

    // Animations
    const animationStep1 = () => {
        // Typed.js
        new Typed("#typed1", {
            stringsElement: "#typed1Elements",
            typeSpeed: 0,
            onStringTyped: () => {
                showStep1 = false;
                showStep2 = true;
            },
        });
    };

    const animationStep2 = () => {
        homeLoadingBarEl = document.getElementById("homeLoadingBar");

        let progress = 0;
        const animateLoadBar = () => {
            progress += 0.5;
            homeLoadingBarEl.style.width = `${progress}%`;
            if (progress >= 100) {
                showStep2 = false;
                showStep3 = true;
                animationStep3();
            } else {
                setTimeout(animateLoadBar, Math.floor(Math.random() * 20));
            }
        };
        animateLoadBar();
    };

    export let onIntroFinished: () => void;
    const animationStep3 = async () => {
        await intro();
        onIntroFinished();
    };

    onMount(() => {
        animationStep1();
    });

    export function intro() {
        return new Promise<void>((resolve) => {
            showStep3 = true;
            showStep3Name = true;
            showStep3SurName = true;
            showStep3Info = true;

            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }

    export function outro() {
        return new Promise<void>((resolve) => {
            showStep3Name = false;
            showStep3SurName = false;
            showStep3Info = false;

            setTimeout(() => {
                showStep3 = false;
                resolve();
            }, 1200);
        });
    }
</script>

{#if showStep1}
    <div class="w-full h-full font-mono text-left" out:fade>
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
{/if}
{#if showStep2}
    <div
        class="w-full h-full container mx-auto p-4 flex items-center justify-center flex-col"
        in:fade
        out:fade
        on:introend={animationStep2}
    >
        <span class="flex">
            <!-- TODO: Real logo -->
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
                    id="homeLoadingBar"
                    style="width:0%"
                    class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-bl from-green-500 to-blue-600 "
                    bind:this={homeLoadingBarEl}
                />
            </div>
        </div>
    </div>
{/if}
{#if showStep3}
    <div
        class="w-full h-full container mx-auto p-4 flex items-center justify-center"
    >
        <div class="text-center">
            {#if showStep3SurName}
                <h1
                    class=" text-7xl md:text-9xl pb-10 font-extrabold"
                    in:slide={{ delay: 200, duration: 800 }}
                    out:slide={{ delay: 200, duration: 800 }}
                >
                    Augustin
                </h1>
            {/if}
            {#if showStep3Name}
                <h2
                    class=" text-7xl md:text-9xl font-extrabold"
                    in:slide={{ duration: 600 }}
                    out:slide={{ delay: 400, duration: 800 }}
                >
                    BÉGUÉ
                </h2>
            {/if}
            {#if showStep3Info}
                <div
                    class="text-center"
                    in:slide={{ delay: 600, duration: 600 }}
                    out:slide={{ duration: 600 }}
                >
                    <h4 class=" text-base font-medium">19 yo</h4>
                    <h4 class=" text-base font-medium">student @ Epita</h4>
                    <h4 class=" text-base font-medium">Paris, France</h4>
                </div>
            {/if}
        </div>
    </div>
{/if}
