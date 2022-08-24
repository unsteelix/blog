<script>
    import Post from '$components/Post.svelte';
    import Folder from '$components/Folder.svelte';
    import { onMount } from 'svelte'
    import { picolaUrl } from '$src/lib/const'

    export let pages
    export let path

    // return "post" OR "folder"
    const getPageType = (page) => {
        if(path === '/') return 'folder'
        if(page.postId) return 'post'
        return 'folder'
    }

    $: page = pages.find(p => p.path === path)
    $: pageType = getPageType(page)

    let isLoaded = false
    let posts = []
    onMount(async () => {
        posts = await fetch(`/api/posts`)
                        .then(res => res.json())
        isLoaded = true
    })

</script>

<svelte:head>
{#if isLoaded}
    {#each posts as post, index}
    <link rel="preload" as="image" href={`/${picolaUrl}/i/${post.img}?w=1920&h=1080&resize=cover&f=jpeg&q=90`}>
    {/each}
{/if}
</svelte:head>

{#if pageType === 'post'}
    <Post id={page.postId} />
{:else}
    <Folder pages={pages} />
{/if}

<style lang="scss">

</style>