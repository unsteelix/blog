<script>
    export let imgs
    export let viewportWidth

    // расчет ширины одной картинки
    const koefMargin = imgs.length === 1 ? 0.9 : 0.8
    let widthProcent = parseInt((100 / imgs.length) * koefMargin) // %
    console.log(viewportWidth, imgs.length)

    let width = parseInt(viewportWidth / imgs.length)

</script>

<div class="wrap">
{#each imgs as img}
    <div class="oneImg" style="--width: {widthProcent}%;" >
        <img src={`//localhost:7400/i/${img}?w=${width}`} alt={img}  />
    </div>
{/each}
</div>

<style lang="scss">
    .wrap {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        max-height: 100vh;
        margin: 5rem 0;

        .oneImg {
            width: var(--width);
            padding: 3rem 0;
            height: 100%;
            max-height: 100vh;
            
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            img {
                max-height: calc(100vh - 6rem);
                max-width: 100%;   
            }
        }
    }
</style>