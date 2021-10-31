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

<div class="w-full bg-black p-4 flex flex-row rounded">
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
