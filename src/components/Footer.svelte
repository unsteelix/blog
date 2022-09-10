<script>
    import { onMount } from 'svelte';

    let w
    let h

    onMount(() => {
        w = document.documentElement.clientWidth
        h = document.documentElement.clientHeight
    });
</script>

<footer>
    <div class="resolution">
        <!-- <a href="/">Home</a>         -->
        {w} * {h}
    </div>
    <div class="madeBy">
        made by unsteelix
    </div>
    <div class="links">
        <a href="/about">About</a>
    </div>
</footer>

<style lang="scss">
    footer {
        border-top: 1px solid gainsboro;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;

        .resolution {
            visibility: collapse;
            // color: white;
        }

        .madeBy {

        }

        .links {

        }
    }
</style>