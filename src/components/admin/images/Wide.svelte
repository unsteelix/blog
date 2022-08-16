<script>
    export let imgs
</script>

<div class="wrap">
{#each imgs as img}
    <img src={`//localhost:7400/i/${img}?w=767`} alt={img} class="oneImg" />
{/each}
</div>

<style lang="scss">
    .wrap {
        display: flex;
        flex-direction: column;
        

        .oneImg {
            max-height: 300px;
            width: fit-content;
        }
    }
</style>