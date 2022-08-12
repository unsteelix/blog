<script>
    import { onMount } from 'svelte'

    export let id
    let isLoaded = false
    let post

    onMount(async () => {
        post = await fetch(`/api/post/${id}`)
                        .then(res => res.json())
        isLoaded = true
    })
</script>

{#if isLoaded}
    {#each post.blocks as block, index}
        {@html block.value}
    {/each}
{:else}
    Loading...
{/if}