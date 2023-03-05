<script>
    import Footer from '$components/Footer.svelte'
    import Header from '$components/Header.svelte'
    import { onMount } from 'svelte'

    let isMobile = false
    onMount(async () => {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            isMobile = true
        }
    })

    const onImgClick = () => {
        isMobile = false
    }
</script>


{#if isMobile}
    <div class="mobile">
        Ты что пытался смотреть фотографии с телефона?
        <div class="imgWrap" on:click={onImgClick} >
            <!-- <img src="facepalm.png" alt="facepalm" /> -->
            <img alt="facepalm" src="data:image/png;base64,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">
        </div>
        Такое нужно смотреть только на большом дисплее
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
        justify-content: space-around;
        align-items: center;
        width: 100%;
        height: 100vh;
        font-size: 1.4rem;
        padding: 4rem;
        text-align: center;
        
        .imgWrap {
            width: 90vw;
            height: 40vh;

            img {
                object-fit: contain;
                width: 100%;
                height: 100%;
            }
        }
    }

</style>