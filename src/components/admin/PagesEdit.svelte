<script>
    import { onMount } from 'svelte'

    let isLoaded = false

    /**
    * @type {Array<any>}
    */
    let pages = []

    const onSaveBtnClick = async () => {
        isLoaded = false
        pages = await fetch(`/api/page/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pages) 
            
        }).then(res => res.json())
        isLoaded = true
    }

    const onDelBtnClick = (rowIndex) => {
        pages.splice(rowIndex, 1)
        console.log(rowIndex)
        pages = pages
    }

    const onInputChange = (rowIndex, input, value) => {
        console.log('sadsad-' + rowIndex, input, value)
        pages[rowIndex][input] = value

        //console.log(pages)
    }

    const onAddBtnClick = () => {
        const newPage = {
            id: 'new-id',
            path: 'some-path',
            title: 'some-title',
            img: 'some-img'
        }
        pages.push(newPage)
        pages = pages
        console.log(pages)
    }
    
    onMount(async () => {
        pages = await fetch('/api/pages')
                        .then(res => res.json())
        isLoaded = true
    })
</script>

<div class="wrap">
    {#if isLoaded}
        {#each pages as page, index}
            <div class="onePage">
                <div>
                    <input type="text" value={page.path} on:change={(e) => onInputChange(index, 'path', e.target?.value)} />
                </div>
                <div>
                    <input type="text" value={page.title} on:change={(e) => onInputChange(index, 'title', e.target?.value)} />
                </div>
                <div>
                    <input type="text" value={page.img} on:change={(e) => onInputChange(index, 'img', e.target?.value)} />
                </div>
                <div on:click={() => onDelBtnClick(index)}>
                    del
                </div>
            </div>
        {/each}
        <div on:click={() => onAddBtnClick()}>
            add
        </div>
        <div on:click={() => onSaveBtnClick()}>
            save
        </div>
    {:else}
        Loading...
    {/if}
</div>

<style>
    .wrap {
        border: 1px solid grey;
    }

    .onePage {
        border-bottom: 2px solid cornflowerblue;
        margin: 0.3rem 0.3rem 0.7rem 0.3rem;
        /* background-color: cornflowerblue; */

        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
</style>