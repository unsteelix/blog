<script>
    export let imgs
</script>

<div class="wrap">
{#each imgs as img}
    <img src={`//localhost:7400/i/${img}?w=400&h=240`} alt={img} class="oneImg" />
{/each}
</div>

<style lang="scss">
    .wrap {
        display: flex;
        flex-direction: column;
        

        .oneImg {
            margin: 0.2rem;
            height: 300px;
        }
    }
</style>