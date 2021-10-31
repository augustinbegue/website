<script lang="ts">
    import { slide } from "svelte/transition";

    let errorMessage = "";

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
        class=" bg-red-600 m-4 p-4 text-white hidden rounded"
        in:slide
        out:slide
    >
        {errorMessage}
    </div>
{/if}
