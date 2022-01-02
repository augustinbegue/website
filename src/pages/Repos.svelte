<script lang="ts">
    import { onMount } from "svelte";
    import { Octokit } from "octokit";
    import { blur, fade } from "svelte/transition";
    import * as octicons from "@primer/octicons";

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
                delay = repos.length * 100;
            },
            (error) => {
                console.error(error);
            },
        );
    });

    let displayRepos = false;
    let delay = 0;

    export function intro() {
        displayRepos = true;

        return new Promise<void>((resolve) => {
            setTimeout(() => {
                resolve();
            }, delay);
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
    <div
        class="bg-gradient-to-bl from-green-500 dark:from-green-800 to-blue-600 dark:to-blue-800"
        in:blur
        out:blur
    >
        <div class="container mx-auto p-4 pb-32">
            {#each repos as repo, i}
                {#key repo}
                    <div
                        class="frosted p-4 m-4 rounded transition-all bg-white dark:bg-black opacity-80 hover:opacity-100 text-black hoverable flex flex-col justify-start content-start"
                        on:click={() => {
                            window.open(repo.html_url, "_blank");
                        }}
                        in:fade={{ delay: 100 * i }}
                        out:fade
                    >
                        <p>{repo.name}</p>
                        <div class="inline-flex items-center">
                            <span class="opacity-50 mt-0.5">
                                {@html octicons["star"].toSVG()}
                            </span>
                            <p class="mx-2">{repo.stargazers_count}</p>
                            <span class="opacity-50 mt-0.5">
                                {@html octicons["issue-opened"].toSVG()}
                            </span>
                            <p class="mx-2">{repo.open_issues_count}</p>
                            <span class="opacity-50 mt-0.5">
                                {@html octicons["repo-forked"].toSVG()}
                            </span>
                            <p class="mx-2">{repo.forks_count}</p>
                        </div>
                        <div class="pt-2">
                            {#each repo.topics as tag, i}
                                {#key tag}
                                    <span
                                        class="inline-block bg-dark-100 rounded-full px-3 py-1 text-sm font-semibold text-dark-500 mr-2 bg-opacity-50"
                                    >
                                        {tag}
                                    </span>
                                {/key}
                            {/each}
                        </div>
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
