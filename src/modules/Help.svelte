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
        class="bg-dark-100 m-4 p-4 text-white rounded flex flex-col justify-start align-top"
        in:slide
        out:slide
    >
        <div class="flex justify-between pb-2">
            <span>Help:</span>
            <button
                class="text-white px-2 hover:opacity-80 hover:text-black hover:bg-white transition-all rounded hoverable"
                on:click={outro}
            >
                x
            </button>
        </div>
        <div>
            <p>display [page] - displays the selected page</p>
            <ul>
                <li>-> home - home page</li>
                <li>-> about - bunch of infos about me (+ resume)</li>
                <li>-> projects - list of the projects I've done</li>
                <li>-> posts - posts I've written</li>
                <li>-> repos - list of my github repos</li>
            </ul>
            <br />
            <p>help - displays this help page</p>
        </div>
    </div>
{/if}
