<script>
    import { onMount } from 'svelte'

    /**
    * @type {Array<any>}
    */
    let pages

    const onSaveBtnClick = async (rowIndex, pageId) => {
        const page = pages[rowIndex]

        console.log('save', page)

        const res = await fetch(`/api/page/update/${pageId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(page) 
            
        }).then(res => res.json())

        console.log(res)
    }

    const onInputChange = (rowIndex, input, value) => {
        console.log('sadsad-' + rowIndex, input, value)
        pages[rowIndex][input] = value

        //console.log(pages)
    }
    
    onMount(async () => {
        const pagesMap = await fetch('/api/pages')
                        .then(res => res.json())

        pages = []

        for(let pageId in pagesMap){
            const page = {
                id: pageId,
                ...pagesMap[pageId]
            }
            pages.push(page)
        }

        console.log(pages)

    })
</script>

<div>
    {#if pages}
        {#each pages as page, index}
            <div>
                <div>{page.id}</div>
                <div>
                    <input type="text" value={page.path} on:change={(e) => onInputChange(index, 'path', e.target?.value)} />
                </div>
                <div>
                    <input type="text" value={page.title} on:change={(e) => onInputChange(index, 'title', e.target?.value)} />
                </div>
                <div>
                    <input type="text" value={page.img} on:change={(e) => onInputChange(index, 'img', e.target?.value)} />
                </div>
                <div on:click={() => onSaveBtnClick(index, page.id)}>
                    save
                </div>
            </div>
        {/each}
    {:else}
        Loading...
    {/if}
    dofpsdf
</div>