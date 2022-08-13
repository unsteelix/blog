<script>
    export let imgs
</script>

{#each imgs as img}
    <div class="oneImg">
        <img src={`//localhost:7400/i/${img}?w=1400`} alt={img} />
    </div>
{/each}

<style lang="scss">
    .oneImg {
        width: 100%;
        min-height: 100vh;
        height: auto;
        margin: 4rem 0;

        img {
            width: 100%;
            height: auto;
        }
    }
</style>