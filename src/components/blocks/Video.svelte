<script>
    export let data
    
    // clean from tags
    let dom = new DOMParser().parseFromString(data, 'text/html');
    let text = dom.body.textContent

    const [id, ...rest] = text.split(' ')  

    const muted = rest.includes('muted')
    const autoplay = rest.includes('autoplay')

    const options = {
        // родитель целевого элемента - область просмотра
        root: null,
        // без отступов
        rootMargin: '1%',
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
                console.log('sdsdsd', entry)
                //lazyImg.trigger('play');
                document.getElementsByTagName('video')[0].play()
                console.log('ddddd', document.getElementsByTagName('video')[0])

            }

            // if (entry.intersectionRect) {

            // }
        })
    }, options)

    // с помощью цикла следим за всеми img на странице
    setTimeout(() => {
        const arr = document.getElementsByTagName('video')
        Object.values(arr).forEach(i => {
            observer.observe(i)
        })        
    }, 10);
</script>

<div class="wrap">
    <!-- svelte-ignore a11y-media-has-caption -->
    <video src={`/${id}`} loop width="100%" height="auto" poster="" muted={muted} autoplay={autoplay} />
</div>

<style lang="scss">
    .wrap {
        width: 100%;
        padding: 4rem 0;
    }
</style>
