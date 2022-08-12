<nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/admin">Admin</a>
</nav>
  
<slot></slot>

<footer>
    made by unsteelix
</footer>

<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;1,200;1,300;1,400;1,500;1,600&display=swap');

    :global(*) {
        box-sizing: border-box;
        font-family: 'Nunito', sans-serif;
        font-family: 'Inter', sans-serif;
    }

    :global(body) {
		margin: 0;
        padding: 0;
        box-sizing: border-box;
        width: 100%;
        height: 100%;

        a {
            color: unset;
            text-decoration: unset;

            &:hover {
                color: gray;
            }
        }
    }

    nav {
        padding: 0.4rem;
        border-bottom: 1px solid gray;
    }

    footer {
        border-top: 1px solid gainsboro;
        padding: 1rem;
        text-align: center;
    }

</style>