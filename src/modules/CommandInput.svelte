<script lang="ts">
    import type { commandHandler } from "../commandHandler";

    export let commandInput: HTMLInputElement;
    export let handler: commandHandler;
    export let prevPage: () => void;
    export let nextPage: () => void;
    export function selectCommandInput() {
        commandInput.select();
        commandInput.focus();
    }
</script>

<svelte:window
    on:keydown={(e) => {
        // arrow up -> previous command
        if (e.key === "ArrowUp") {
            let command = "";
            if ((command = handler.commandHistory.pop()))
                commandInput.value = command;
        }

        // left arrow -> previous page
        if (e.key === "ArrowLeft" && document.activeElement != commandInput) {
            return prevPage();
        }

        // right arrow -> next page
        if (e.key === "ArrowRight" && document.activeElement != commandInput) {
            return nextPage();
        }

        if (document.activeElement != commandInput) {
            commandInput.select();
            commandInput.focus();
        }
    }}
/>

<div
    class="w-full bg-dark-100 p-4 flex flex-row rounded ring-offset-1 focus-within:ring-1 focus-within:ring-offset-transparent focus-within:ring-dark-200 focus-within:dark:ring-dark-300 transition-all duration-300 hoverable"
>
    <p class="text-white animate-pulse">$&nbsp;</p>
    <input
        type="text"
        placeholder="Type help for help..."
        class="w-full bg-transparent text-white outline-none border-none cursor-none"
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
        on:click={(e) => {
            prevPage();
            e.target.blur();
        }}
        class="text-button hoverable"
    >
        &#60;
    </button>
    <button
        on:click={(e) => {
            nextPage();
            e.target.blur();
        }}
        class="text-button hoverable"
    >
        &#62;
    </button>
</div>
