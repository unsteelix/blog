<script>
    import Wide from './Wide.svelte'
    import Padding from './Padding.svelte'
    import { onMount } from 'svelte';

    let viewportWidth
    let viewportHeight

    let isReady = false

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

    onMount(() => {
        viewportWidth = document.documentElement.clientWidth
        viewportHeight = document.documentElement.clientHeight
        isReady = true
    });

    const imgs = parseData(data)
</script>

{#if isReady}
    {#if type === 'img-wide'}
        <Wide {imgs} {viewportWidth} {viewportHeight} />
    {:else if type === 'img-padding'}
        <Padding {imgs} {viewportWidth} {viewportHeight} />
    {/if}
{/if}