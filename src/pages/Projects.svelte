<script lang="ts">
    let display = false;

    export function intro() {
        return new Promise<void>((resolve) => {
            display = true;
            resolve();
        });
    }

    export function outro() {
        return new Promise<void>((resolve) => {
            display = false;
            resolve();
        });
    }
</script>

{#if display}
    projects
{/if}
