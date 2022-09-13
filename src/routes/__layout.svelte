<script>
    import Footer from '$components/Footer.svelte'
    import Header from '$components/Header.svelte'
    import { onMount } from 'svelte'

    let isMobile = false
    onMount(async () => {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            isMobile = false
        }
    })
</script>


{#if isMobile}
    <div class="mobile">
        Ты что пытался смотреть фотографии с телефона?
        <img src="facepalm.png" alt="facepalm" />
        Такое нужно смотреть только с большого дисплея
    </div>
{:else}
    <Header />
    <div class="wrap">
        <slot></slot>
    </div>
    <Footer />
{/if}


<style lang="scss">
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600&family=Nunito:ital,wght@0,200;0,300;0,400;0,500;0,600;1,200;1,300;1,400;1,500;1,600&display=swap');

    :global(*) {
        box-sizing: border-box;
        font-family: 'Nunito', sans-serif;
        font-family: 'Inter', sans-serif;
    }

    :global(a) {
        color: unset;
        text-decoration: none;
    }

    :global(body) {
		margin: 0;
        padding: 0;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }

    .wrap {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        min-height: 100vh;
    }

    .mobile {
        display: flex;
        flex-direction: column;
        justify-content:space-around;
        align-items: center;
        width: 100%;
        height: 100vh;
        font-size: 1.4rem;
        padding: 5rem;
        text-align: center;
        
        img {
            margin: 20%;
            width: 50vw;
            height: auto;
        }
    }

</style>