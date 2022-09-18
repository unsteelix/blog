<script>
    export let data
</script>

<div class="wrap">
    <!-- svelte-ignore a11y-media-has-caption -->
    <video src={`/${data}.mp4`} loop muted width="100%" height="auto" poster="" autoplay/>
</div>

<style lang="scss">
    .wrap {
        width: 100%;
        padding: 4rem 0;
    }
</style>
