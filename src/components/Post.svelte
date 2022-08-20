<script>
    import { onMount } from 'svelte'
    import Text from '$components/blocks/Text.svelte'
    import Img from '$components/blocks/images/index.svelte'
    import { picolaUrl } from '$src/lib/const'
    
    export let id
    let isLoaded = false
    let post

    let viewportWidth
    let viewportHeight

    onMount(async () => {
        viewportWidth = document.documentElement.clientWidth
        viewportHeight = document.documentElement.clientHeight

        post = await fetch(`/api/post/${id}`)
                        .then(res => res.json())
        isLoaded = true
    })
</script>

<div class="wrap">
{#if isLoaded}
    <div class="cover">
        <div class="title">{post.title}</div>
        <div class="date">{post.date}</div>
        <img src={`${picolaUrl}/i/${post.img}?w=${viewportWidth}&h=${viewportHeight}&resize=cover`} alt={post.img} />
    </div>
    <div class="blocks">
        {#each post.blocks as block, index}
            {#if block.type === 'text'}
                <Text value={block.value} />
            {:else}
                <Img type={block.type} data={block.value} />
            {/if}
        {/each}
    </div>
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

        .cover {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100vh;

            .title {
                z-index: 1;
                color: white;
                font-size: 5rem;
                margin: 1rem;
            }

            .date {
                z-index: 1;
                color: white;
                font-size: 1rem;
            }

            img {
                position: fixed;
                z-index: -1;
            }
        }

        .blocks {
            z-index: 1;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            background-color: white;
            padding: 8rem 0;
            
            .oneBlock {

            }
        }
    }
</style>