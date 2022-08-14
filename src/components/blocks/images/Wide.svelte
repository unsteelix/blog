<script>
    export let imgs
</script>

{#each imgs as img}
    <img src={`//localhost:7400/i/${img}?w=1400`} alt={img} />
{/each}

<style lang="scss">
    img {
        width: 100%;
        height: auto;
        padding: 8rem 0;
    }
</style>