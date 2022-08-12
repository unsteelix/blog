<script>
    import { page } from '$app/stores';
    import { onMount, beforeUpdate, afterUpdate, tick } from 'svelte';
    import Post from '$components/Post.svelte';
    import Folder from '$components/Folder.svelte';


    let pages = []

    let isLoaded = false
    let isPost
    let postId

    $: {
        let path = `/${$page.params.path}`;

        console.log('2222222', path)
        if(isLoaded){
            let p2age
            pages.forEach(p => {
                if(p.path === path){
                    p2age = p
                }
            })
            if(p2age){
                if(p2age.postId){
                    postId = p2age.postId
                    isPost = true
                }
            } else {
                if(path !== '/'){
                    alert('page not found')
                }
            }
        }
        isPost = isPost
        postId = postId
        path = path
        console.log(path)
    } 


    afterUpdate(async () => {
        console.log('ÇHAIKIN')
        pages = pages
    })

    onMount(async () => {
        pages = await fetch('/api/pages')
                        .then(res => res.json())
        isLoaded = true
    })
</script>

{#if isLoaded}
    {#if isPost}P==
        <Post id={postId} />
    {:else}F==
        <Folder pages={pages} />
    {/if}
{:else}
    Loading...
{/if}