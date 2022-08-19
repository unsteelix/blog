<header>
    <div class="logo">
        <a href="/">Home</a>        
    </div>

</header>

<style lang="scss">
    header {
        z-index: 100;
        position: fixed;
        // padding: 1rem 5rem;
        left: 0px;
        // height: 3rem;
        transition: 0.2s all;
        // opacity: 0;

        .logo {
            font-size: 1.2rem;
            padding: 1rem;
            color: #464646;
            // position: absolute;
            // left: 1rem;
            // color: black;
            // border: 2px solid black;
            // padding: 0.2rem 1.2rem;
            // background-color: white;
        }

        &:hover {
            left: 0.3rem;
            // opacity: 1;
        }
    }
</style>