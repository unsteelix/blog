<script>
    export let imgs

    // расчет ширины одной картинки
    const koefMargin = 0.8
</script>

<div class="wrap">
{#each imgs as img}
    <img src={`//localhost:7400/i/${img}?h=400`} alt={img} />
{/each}
</div>

<style lang="scss">
    .wrap {
        height: 100vh;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        align-content: stretch;
        margin: 4rem 0;
        padding: 10% 0;

        img {
            width: 40%;
            height: auto;
            margin: 3%;
        }
    }
</style>