<script>
    import { onMount } from 'svelte';
    import { customAlphabet } from 'nanoid'
    import { picolaUrl } from '$src/lib/const'

    export let imgs
    export let viewportWidth

    // расчет ширины одной картинки
    const koefMargin = imgs.length === 1 ? 0.9 : 0.8
    let widthProcent = parseInt((100 / imgs.length) * koefMargin) // %

    let width = parseInt(viewportWidth / imgs.length)

    let isMounted = false

    const nanoid = customAlphabet('1234567890abcdef', 10)
    const id = nanoid()

    let map = {}

    onMount(() => {
        imgs.forEach(i => {
            map[i] = {
                url: `${picolaUrl}/i/${i}?w=${width}&f=jpeg&q=95`,
                previewUrl: `${picolaUrl}/i/${i}?w=${width}&f=jpeg&q=50&blur=5`,
                id: `${i}-${nanoid()}`,
                isReady: false
            }
        });

        isMounted = true

        const options = {
            // родитель целевого элемента - область просмотра
            root: null,
            // без отступов
            rootMargin: '20%',
            // процент пересечения - половина изображения
            threshold: 0
        }

        // создаем наблюдатель
        const observer = new IntersectionObserver((entries, observer) => {
            // для каждой записи-целевого элемента
            entries.forEach(entry => {
                // если элемент является наблюдаемым
                if (entry.isIntersecting) {
                    const lazyImg = entry.target
                    
                    const id = lazyImg.id.split('-')[0]
                    map[id].isReady = true
                    map = map

                    // прекращаем наблюдение
                    observer.unobserve(lazyImg)
                }
            })
        }, options)

        // с помощью цикла следим за всеми img на странице
        setTimeout(() => {
            const arr = document.getElementById(id)?.querySelectorAll('img')
            arr.forEach(i => {
                observer.observe(i)
            })        
        }, 10);
    });
</script>

{#if isMounted}
<div class="wrap" {id}>
    {#each imgs as img}
        <div class="oneImg" style="--width: {widthProcent}%;" >
            <img src={map[img].isReady ? map[img].url : map[img].previewUrl} alt={img} id={map[img].id} />
        </div>
    {/each}
</div>
{/if}

<style lang="scss">
    .wrap {
        width: 100%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        max-height: 100vh;
        margin: 5rem 0;

        .oneImg {
            width: var(--width);
            padding: 3rem 0;
            height: 100%;
            max-height: 100vh;
            
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            img {
                max-height: calc(100vh - 6rem);
                max-width: 100%;   
            }
        }
    }
</style>