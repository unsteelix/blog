<script>
    export let data

    // clean from tags
    let dom = new DOMParser().parseFromString(data, 'text/html');
    let text = dom.body.textContent

    const [id, params] = text.split(' ')    
</script>

<div class="wrap">
    <video src={`/${id}`} width="100%" height="auto" poster="" controls/>
</div>

<style lang="scss">
    .wrap {

    }
</style>