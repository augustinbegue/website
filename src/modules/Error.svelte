<script lang="ts">
    import { slide } from "svelte/transition";
    import { errorMessage } from "../stores";

    let displayError = false;
    export function intro() {
        displayError = true;

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 400);
        });
    }

    export function outro() {
        displayError = false;

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 400);
        });
    }
</script>

{#if displayError}
    <div
        class=" bg-red-600 m-4 p-4 text-white rounded flex flex-row justify-between"
        in:slide
        out:slide
    >
        <p>{$errorMessage}</p>

        <button class="text-white" on:click={outro}>x</button>
    </div>
{/if}
