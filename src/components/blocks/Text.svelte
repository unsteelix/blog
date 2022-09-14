<script>
    export let value
</script>

<div class="wrap">
    {@html value}
</div>

<style lang="scss">
    .wrap {
        width: 100%;
        max-width: 500px;
        padding: 4rem 2rem;
        font-size: 1.2rem;
        line-height: 2rem;
        color: #343434;
    }
</style>
