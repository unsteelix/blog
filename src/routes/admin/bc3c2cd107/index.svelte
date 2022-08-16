<script>
    import PagesEdit from '$components/admin/PagesEdit.svelte'
    import PostsEdit from '$components/admin/PostsEdit.svelte'
</script>

<div class="wrap">
    <PagesEdit />
    <PostsEdit />
</div>

<style lang="scss">
    .wrap{
        display: flex;
        justify-content: space-around;
        align-items: flex-start;

        padding: 1rem;
    }

</style>