<header>
    <div class="logo">
        <a href="/">Home</a>        
    </div>

</header>

<style lang="scss">
    header {
        // background-color: black;

        position: fixed;
        padding: 1rem 5rem;
        left: -5rem;
        height: 3rem;
        z-index: 100;
        transition: 0.2s all;
        opacity: 0;

        .logo {
            position: absolute;
            left: 1rem;

            color: black;
            font-size: 1.2rem;
            border: 2px solid black;
            padding: 0.2rem 1.2rem;
            background-color: white;
        }

        &:hover {
            left: 0rem;
            opacity: 1;
        }
    }
</style>