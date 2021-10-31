<script lang="ts">
    import { onMount } from "svelte";
    import { Octokit } from "octokit";

    import { blur, fade } from "svelte/transition";

    // Octokit
    const octokit = new Octokit();
    let repos = [];

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
    });

    let displayRepos = false;

    export function intro() {
        displayRepos = true;

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 400);
        });
    }

    export function outro() {
        displayRepos = false;

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, 400);
        });
    }
</script>

<!-- TODO: Automatically divide repos into pages -->
{#if displayRepos}
    <div class="bg-gradient-to-bl from-green-500 to-blue-600" in:blur out:blur>
        <div
            class="container mx-auto p-4 overflow-y-scroll overflow-x-hidden w-full h-full max-h-screen pb-32 md:no-scrollbar"
        >
            {#each repos as repo, i}
                {#key repo}
                    <div
                        class="frosted p-4 m-4 rounded transition-all cursor-pointer bg-white opacity-80 hover:opacity-100 text-black"
                        on:click={() => {
                            window.open(repo.html_url, "_blank");
                        }}
                        in:fade={{ delay: 100 * i }}
                        out:fade={{ delay: 100 * i }}
                    >
                        <p>{repo.name}</p>
                        {repo.stargazers_count} stars
                    </div>
                {/key}
            {/each}
        </div>
    </div>
{/if}

<style>
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
