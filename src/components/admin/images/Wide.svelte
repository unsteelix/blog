<script>
    import { picolaUrl } from '$src/lib/const'

    export let imgs
</script>

<div class="wrap">
{#each imgs as img}
    <img src={`${picolaUrl}/i/${img}?w=767`} alt={img} class="oneImg" />
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