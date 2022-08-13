<script>
    export let imgs
</script>

<div class="wrap">
{#each imgs as img}
    <img src={`//localhost:7400/i/${img}?w=200&h=200`} alt={img} class="oneImg" />
{/each}
</div>

<style lang="scss">
    .wrap {
        display: flex;
        flex-wrap: wrap;
        

        .oneImg {
            margin: 0.2rem;
        }
    }
</style>