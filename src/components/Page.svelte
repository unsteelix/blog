<script>
    import Post from '$components/Post.svelte';
    import Folder from '$components/Folder.svelte';

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
</script>

{#if pageType === 'post'}
    <Post id={page.postId} />
{:else}
    <Folder pages={pages} />
{/if}