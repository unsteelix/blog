<script>
    import { onMount } from 'svelte';
    import { customAlphabet } from 'nanoid'
    import { picolaUrl } from '$src/lib/const'

    export let imgs

    export let viewportWidth
    export let viewportHeight

    let isMounted = false

    const nanoid = customAlphabet('1234567890abcdef', 10)
    const id = nanoid()

    let map = {}

    onMount(() => {
        imgs.forEach(i => {
            map[i] = {
                url: `${picolaUrl}/i/${i}?w=${viewportWidth}&f=jpeg&q=95`,
                previewUrl: `${picolaUrl}/i/${i}?w=${viewportWidth}&f=jpeg&q=50&blur=5`,
                id: `${i}-${nanoid()}`,
                isReady: false
            }
        });

        isMounted = true

        const options = {
            // родитель целевого элемента - область просмотра
            root: null,
            // без отступов
            rootMargin: '100%',
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
<div {id}>
    {#each imgs as img}
        <img src={map[img].isReady ? map[img].url : map[img].previewUrl} alt={img} id={map[img].id} />
    {/each}
</div>
{/if}

<style lang="scss">
    img {
        width: 100%;
        height: auto;
        padding: 8rem 0;
    }
</style>