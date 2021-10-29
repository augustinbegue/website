<script lang="ts">
    import { onMount } from "svelte";
    import { createScene } from "./scene";

    import { Octokit } from "octokit";

    const octokit = new Octokit();

    let el: HTMLCanvasElement;
    let repos = [];

    onMount(() => {
        createScene(el);

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
</script>

<main>
    <canvas bind:this={el} class="z-0 absolute top-0 left-0" />
    <div class="container mx-auto px-4 z-10">
        {#each repos as repo}
            <div
                class="bg-white opacity-50 backdrop-filter backdrop-blur-lg p-4 m-4 rounded hover:opacity-80 transition-all"
            >
                <a href={repo.html_url} target="_blank">{repo.name}</a>
                {repo.stargazers_count} stars
            </div>
        {/each}
    </div>
</main>

<style global lang="postcss">
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

    .backdrop-blur-lg {
        backdrop-filter: blur(16px);
    }
</style>
