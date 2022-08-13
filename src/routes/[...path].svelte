<script>
    import { page } from '$app/stores';
    import { onMount, beforeUpdate, afterUpdate, tick } from 'svelte';
    import Page from '$components/Page.svelte';

    $: path = `/${$page.params.path}`;
    let isLoaded = false
    let pages = []

    onMount(async () => {
        pages = await fetch('/api/pages')
                        .then(res => res.json())
        isLoaded = true
    })
</script>

{#if isLoaded}
    <Page {pages} {path} />
{:else}
    Pages is Loading...
{/if}