<script lang="ts">
    import { slide } from "svelte/transition";

    let displayHelp = false;
    export function intro() {
        displayHelp = true;

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 400);
        });
    }

    export function outro() {
        displayHelp = false;

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 400);
        });
    }
</script>

{#if displayHelp}
    <div
        class="bg-black m-4 p-4 text-white rounded flex flex-row justify-between align-top"
        in:slide
        out:slide
    >
        <div>
            <p>Help:</p>
            <p>display [page] - displays the selected page</p>
            <ul>
                <li>-> home - home page</li>
                <li>-> repos - list of my github repos</li>
            </ul>
            <br />
            <p>help - displays this help page</p>
        </div>

        <button class="text-white" on:click={outro}>x</button>
    </div>
{/if}
