<script>
    import Wide from './Wide.svelte'
    import Line from './Line.svelte'
    import Back from './Back.svelte'

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
{:else if type === 'img-padding'}
    <Line {imgs} />
{:else if type === 'img-background'}
    <Back {imgs} />
{/if}