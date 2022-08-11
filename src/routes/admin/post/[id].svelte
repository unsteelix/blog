<script>
    import { onMount } from 'svelte'
    import { page } from '$app/stores';
    import {flip} from "svelte/animate";
    import {dndzone} from "svelte-dnd-action";

    const { id } = $page.params;

    let isLoaded = false;
    /**
    * @type {{ blocks: any[]; id: string; }}
    */
    let post
    /**
    * @type {any[]}
    */
    let items = []

    const flipDurationMs = 300;
    function handleDndConsider(e) {
        items = e.detail.items;
    }
    function handleDndFinalize(e) {
        items = e.detail.items;
    }

    const getNewId = () => 'sdfsdf' + Date.now()

    const onAddBtnClick = () => {
        const newBlock = {
            id: getNewId(),
            type: 'text',
            value: 'afdasd'
        }
        items.push(newBlock)
        items = items
    }

    const onSaveBtnClick = async () => {
        isLoaded = false
        let updatedPost = await fetch(`/api/post/update/${post.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...post,
                blocks: items 
            }) 
            
        }).then(res => res.json())

        console.log(post)

        post = updatedPost
        items = post.blocks
        isLoaded = true
    }

    onMount(async () => {
        post = await fetch(`/api/post/${id}`)
                        .then(res => res.json())

        console.log(post)

        items = post.blocks
        isLoaded = true
    })
</script>

<div class="wrap">
    {#if isLoaded}

    <section use:dndzone="{{items, flipDurationMs}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}">
        {#each items as item(item.id)}
            <div animate:flip="{{duration: flipDurationMs}}">{item.value}</div>
        {/each}
    </section>


        <div class="btns">
            <div on:click={() => onAddBtnClick()} class="add">
                add
            </div>
            <div on:click={() => onSaveBtnClick()} class="save">
                save
            </div>
        </div>
        <!-- {#each blocks as block, index}
            <div class="oneBlock">
                {block.id}
                {block.type}
                {block.value}
            </div>
        {/each} -->
    {:else}
        Loading...
    {/if}
</div>

<style lang="scss">
    .wrap{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        .oneBlock {
            border-bottom: 1px solid grey;
        }

        .btns {
            display: flex;
            justify-content: space-between;
            width: 100%;

            .add, .save {
                padding: 0.5rem;
                cursor: pointer;
                width: 100%;
                text-align: center;

                &:hover{
                    background-color: cornflowerblue;
                    color: whitesmoke;
                }
            }
        }

    }

</style>