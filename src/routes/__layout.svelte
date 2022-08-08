<nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
    <a href="/admin">Admin</a>
</nav>
  
<slot></slot>

<footer>
    made by unsteelix
</footer>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;1,200;1,300;1,400;1,500;1,600&display=swap');

    * {
        font-family: 'Nunito', sans-serif;
        font-family: 'Inter', sans-serif;
        font-size: 1em;
    }

    a {
        color: unset;
        text-decoration: unset;
    }
    a:hover {
        color: gray;
    }

    nav {
        padding: 0.4rem;
        border-bottom: 1px solid gray;
    }

</style>