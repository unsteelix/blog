<script>
    import Wide from './Wide.svelte'
    import Line from './Line.svelte'

    export let type
    export let data

    const parseData = (data) => {
        const list = data.split('<p>')
        const cleanList = []

        list.forEach(el => {
            let dom = new DOMParser().parseFromString(el, 'text/html');
            let txt = dom.body.textContent
            if(txt){
                cleanList.push(txt)
            }
        });

        return cleanList
    }

    const imgs = parseData(data)
</script>

{#if type === 'img-wide'}
    <Wide {imgs} />
{:else if type === 'img-same-width-top'}
    <Line {imgs} />
{:else if type === 'img-same-width-mid'}
    <Line {imgs} />
{:else if type === 'img-same-width-bottom'}
    <Line {imgs} />
{:else if type === 'img-same-height'}
    <Line {imgs} />
{/if}