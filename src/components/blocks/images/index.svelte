<script>
    import Wide from './Wide.svelte'
    import Padding from './Padding.svelte'
    import Background from './Background.svelte'
    import { onMount } from 'svelte';

    let viewportWidth
    let viewportHeight

    let isMounted = false

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
        const browserZoomLevel = Math.round(window.devicePixelRatio);
        viewportWidth = document.documentElement.clientWidth * browserZoomLevel
        viewportHeight = document.documentElement.clientHeight * browserZoomLevel
        isMounted = true
    });

    const imgs = parseData(data)
</script>

{#if isMounted}
    {#if type === 'img-wide'}
        <Wide {imgs} {viewportWidth} {viewportHeight} />
    {:else if type === 'img-padding'}
        <Padding {imgs} {viewportWidth} {viewportHeight} class="oneImgBlock" />
    {:else if type === 'img-background'}
        <Background {imgs} {viewportWidth} {viewportHeight} class="oneImgBlock" />
    {/if}
{/if}