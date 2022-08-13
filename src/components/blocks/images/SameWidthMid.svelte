<script>
    export let imgs

    // расчет ширины одной картинки
    const koefMargin = 0.8
    let width = parseInt((100 / imgs.length) * koefMargin)
</script>

<div class="wrap">
{#each imgs as img}
    <div class="oneImg" style="--width: {width}%;" >
        <img src={`//localhost:7400/i/${img}?w=1400`} alt={img} />
    </div>
{/each}
</div>

<style lang="scss">
    .wrap {
        width: 100%;
        height: 100vh;
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: 4rem 0;

        .oneImg {
            width: var(--width);
            height: auto;

            img {
                width: 100%;
                height: auto;
            }
        }
    }
</style>