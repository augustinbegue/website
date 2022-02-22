<script lang="ts">
    import type { Project } from "../global";
    import { slide, blur, fade } from "svelte/transition";
    import { onMount } from "svelte";
    import type { cursorTracker } from "../cursorTracker";
    import {
        collection,
        getDocs,
        orderBy,
        query,
        QuerySnapshot,
    } from "firebase/firestore";
    import { firestore } from "../main";

    let display = false;
    export let ctr: cursorTracker;

    // Fullscreen project
    let fullscreen_project: Project | null = null;

    let projects: Project[] = [];
    let projectsPromise: Promise<Project[]>;

    let delay = projects.length * 150;

    export function intro() {
        return new Promise<void>((resolve) => {
            display = true;
            setTimeout(() => {
                resolve();
            }, delay);
        });
    }

    export function outro() {
        return new Promise<void>((resolve) => {
            display = false;
            setFullScreenProject(null);
            ctr.hideText();
            setTimeout(() => {
                resolve();
            }, delay);
        });
    }

    onMount(async () => {
        const projectsQuery = query(
            collection(firestore, "projects"),
            orderBy("order")
        );

        let projectPath = window.location.pathname.split("/")[2];

        projectsPromise = new Promise(async (resolve, reject) => {
            let snapshot = (await getDocs(
                projectsQuery
            )) as QuerySnapshot<Project>;

            snapshot.forEach((doc) => {
                projects.push(doc.data());
            });

            if (projectPath && projectPath.length > 0) {
                for (let i = 0; i < projects.length; i++) {
                    const project = projects[i];
                    if (project.path === projectPath) {
                        setFullScreenProject(project);
                    }
                }
            }

            delay = projects.length * 150;

            resolve(projects);
        });
    });

    function setFullScreenProject(project: Project | null) {
        fullscreen_project = project;
    }
</script>

{#if display}
    {#if fullscreen_project}
        <div
            in:blur
            out:blur
            class="w-full h-full  z-40 absolute top-0 left-0 flex items-center justify-center"
        >
            <div
                in:slide
                out:slide
                class="container max-h-full overflow-x-scroll no-scrollbar p-4 md:rounded bg-white dark:bg-dark-100 transition-all duration-300 text-dark-50 dark:text-white hoverable"
            >
                <div class="flex place-content-between p-4 pb-2">
                    <span class="text-xl font-bold"
                        >{fullscreen_project.name}</span
                    >
                    <button
                        class="text-xl text-button-light hoverable dark:text-white text-dark-50"
                        on:click={() => {
                            setFullScreenProject(null);
                        }}>x</button
                    >
                </div>
                <div
                    class="p-4 pt-2 flex flex-row flex-wrap md:flex-nowrap flex-shrink"
                >
                    {#if fullscreen_project.media.type === "video"}
                        <video
                            class="rounded md:w-1/2"
                            src={fullscreen_project.media.src}
                            controls={true}
                            autoplay={true}
                            muted={true}
                        />
                    {:else}
                        <img
                            class="rounded md:w-1/2 object-contain"
                            style="max-height: 50vh;"
                            src={fullscreen_project.media.src}
                            alt={fullscreen_project.name}
                        />
                    {/if}
                    <div class="md:pl-4 pt-4">
                        <p class="pt-0 p-2 max-w-prose">
                            {fullscreen_project.description}
                        </p>
                        <ul class="list-none list-inside font-mono p-2">
                            {#if fullscreen_project.link}
                                <li>
                                    <a
                                        class="underline hoverable"
                                        href={fullscreen_project.link.url}
                                        target="_blank"
                                        >{fullscreen_project.link.display}</a
                                    >
                                </li>
                            {/if}
                            {#if fullscreen_project.repo}
                                <li>
                                    <a
                                        class="underline hoverable"
                                        href={fullscreen_project.repo.url}
                                        target="_blank"
                                        >{fullscreen_project.repo.display}</a
                                    >
                                </li>
                            {/if}
                            <li>
                                <span
                                    class="{fullscreen_project.status ===
                                    'in progress'
                                        ? 'bg-yellow-100 hover:bg-dark-100 hover:text-yellow-100'
                                        : fullscreen_project.status ===
                                          'inactive'
                                        ? 'bg-gray-600 hover:bg-dark-100 hover:text-gray-600'
                                        : fullscreen_project.status ===
                                          'completed'
                                        ? 'bg-green-100 hover:bg-dark-100 hover:text-green-100'
                                        : 'bg-red-100 hover:bg-dark-100 hover:text-red-100'} rounded-full px-2 p-1/2 duration-500 transition-all"
                                >
                                    {fullscreen_project.status}
                                </span>
                            </li>
                            <li>
                                {fullscreen_project.dates[0]} -> {fullscreen_project
                                    .dates[1]}
                            </li>
                        </ul>
                        <div class="flex flex-row flex-wrap font-mono pt-4">
                            {#each fullscreen_project.tags as tag}
                                <span
                                    class="m-1 px-3 rounded-full animation-onedark-rainbow"
                                    >{tag}</span
                                >
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {/if}
    {#await projectsPromise}
        <div class="z-30 flex justify-center items-center h-full">
            <i class="fas fa-circle-notch fa-spin fa-4x" />
        </div>
    {:then projects}
        <div
            class="z-30 absolute p-4 pt-32 pb-32 overflow-y-scroll w-full h-full md:no-scrollbar"
        >
            <div class="container mx-auto">
                <div class="projects-grid">
                    {#each projects as project, id}
                        {#key project}
                            <div
                                class="{id === 0 || id === 4
                                    ? 'md:col-span-2'
                                    : ''} {id === 1
                                    ? 'md:row-span-2'
                                    : ''} {fullscreen_project
                                    ? fullscreen_project?.name === project.name
                                        ? 'dark:bg-dark-100'
                                        : 'opacity-10'
                                    : ''} m-4 dark:bg-dark-50 rounded dark:text-white text-dark-50 transition-all duration-300 hoverable border-2 border-dark-100 dark:border-0"
                                in:slide={{ delay: 150 * id }}
                                out:slide={{
                                    delay: 150 * (projects.length - (id + 1)),
                                }}
                                on:dblclick={() => {
                                    setFullScreenProject(project);
                                }}
                                on:mouseenter={() => {
                                    ctr.displayText(
                                        project.tags.join(" ") + " "
                                    );
                                }}
                                on:mouseleave={() => {
                                    ctr.hideText();
                                }}
                            >
                                <div
                                    class="flex place-content-between p-4 pb-2"
                                >
                                    <span class="text-lg font-medium">
                                        {project.name}
                                    </span>
                                    <button
                                        class="text-button-light hoverable"
                                        on:click={() => {
                                            setFullScreenProject(project);
                                        }}
                                        on:mouseenter={() => {
                                            ctr.displayText("fullscreen ");
                                        }}
                                        on:mouseleave={() => {
                                            ctr.hideText();
                                        }}
                                    >
                                        [ ]
                                    </button>
                                </div>
                                <div class="p-4 pt-2 flex flex-row flex-wrap">
                                    {#if project.media.type === "video"}
                                        <video
                                            class="max-w-screen-sm w-full rounded"
                                            src={project.media.src}
                                            controls={true}
                                            autoplay={true}
                                            muted={true}
                                        />
                                    {:else}
                                        <img
                                            class="max-w-screen-sm w-full rounded"
                                            src={project.media.src}
                                            alt={project.name}
                                        />
                                    {/if}
                                    <div>
                                        <ul
                                            class="list-none list-inside font-mono p-2"
                                        >
                                            <li>
                                                {#if project.link}
                                                    <a
                                                        class="underline hoverable"
                                                        href={project.link.url}
                                                        target="_blank"
                                                        >{project.link
                                                            .display}</a
                                                    >
                                                {:else}
                                                    <a
                                                        class="underline hoverable"
                                                        href={project.repo.url}
                                                        target="_blank"
                                                        >{project.repo
                                                            .display}</a
                                                    >
                                                {/if}
                                            </li>
                                            <li>
                                                <span
                                                    class="{project.status ===
                                                    'in progress'
                                                        ? 'bg-yellow-100 hover:bg-dark-100 hover:text-yellow-100'
                                                        : project.status ===
                                                          'inactive'
                                                        ? 'bg-dark-400 hover:bg-dark-100 hover:text-dark-400'
                                                        : project.status ===
                                                          'completed'
                                                        ? 'bg-green-100 hover:bg-dark-100 hover:text-green-100'
                                                        : 'bg-red-100 hover:bg-dark-100 hover:text-red-100'} rounded-full px-2 p-1/2 duration-500 transition-all"
                                                >
                                                    {project.status}
                                                </span>
                                            </li>
                                            <li>
                                                {project.dates[0]} -> {project
                                                    .dates[1]}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        {/key}
                    {/each}
                </div>
            </div>
        </div>
    {/await}
{/if}

<style lang="postcss">
    .projects-grid {
        @apply grid grid-flow-row grid-cols-1 md:grid-cols-3 gap-4 place-content-center;
    }
</style>
