<script>
    export let imgs

    export let viewportWidth
    export let viewportHeight

</script>

{#each imgs as img}
    <img src={`//localhost:7400/i/${img}?w=${viewportWidth}`} alt={img} />
{/each}

<style lang="scss">
    img {
        width: 100%;
        height: auto;
        padding: 8rem 0;
    }
</style>