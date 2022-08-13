<script>
    import { onMount } from 'svelte'
    import Text from '$components/blocks/Text.svelte'
    import Img from '$components/blocks/images/index.svelte'

    export let id
    let isLoaded = false
    let post

    onMount(async () => {
        post = await fetch(`/api/post/${id}`)
                        .then(res => res.json())
        isLoaded = true
    })
</script>

<div class="wrap">
{#if isLoaded}
    {#each post.blocks as block, index}
        {#if block.type === 'text'}
            <Text value={block.value} />
        {:else}
            <Img type={block.type} data={block.value} />
        {/if}
    {/each}
{:else}
    Loading...
{/if}
</div>

<style lang="scss">
    .wrap {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        
        .oneBlock {

            &.text {
                width: 100%;
                max-width: 500px;
                margin: 1rem;
            }

            &.img {
                width: 100%;
                height: auto;
                min-height: 100vh;
            }
            
        }
    }
</style>