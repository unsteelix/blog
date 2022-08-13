<script>
    import Wide from './Wide.svelte'
    import SameWidthTop from './SameWidthTop.svelte'
    import SameWidthMid from './SameWidthMid.svelte'
    import SameWidthBottom from './SameWidthBottom.svelte'
    import SameHeight from './SameHeight.svelte'

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
    <SameWidthTop {imgs} />
{:else if type === 'img-same-width-mid'}
    <SameWidthMid {imgs} />
{:else if type === 'img-same-width-bottom'}
    <SameWidthBottom {imgs} />
{:else if type === 'img-same-height'}
    <SameHeight {imgs} />
{/if}