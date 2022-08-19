<script>
    import { onMount } from 'svelte'
    import { page } from '$app/stores';

    export let pages

    $: path = `/${$page.params.path}`;

    let isLoaded = false
    let post

    // фильтруем список стр, оставляя только те, что в данной папке
    const filterPagesByPath = (pages, path) => {
        const res = []
        
        if(path === '/'){
            pages.forEach(page => {
                if(page.path.split('/').length === 2){
                    res.push(page)
                }        
            });
        } else {
            // ищем страницы, входящие в данную папку
            pages.forEach(page => {
                // ищем страницы с таким path в начале
                const ppath = page.path
                if(ppath.includes(path, 0) && ppath !== path){
                    // смотрим правую часть пути и берем то, что имеют один /
                    const rightPSideOfPath = ppath.substring(path.length)
                    if(rightPSideOfPath.split('/').length === 2){
                        res.push(page)
                    }
                }
            })
        }
        return res
    }

    $: filteredPages = filterPagesByPath(pages, path)

    const onPageChange = (path) => {
        window.location.replace(path)
    }

    onMount(async () => {
        //post = await fetch(`/api/post/${id}`)
                        //.then(res => res.json())
        isLoaded = true
    })
</script>

<div class="pages">
{#each filteredPages as page, index}
    <div class="page" >
        <a href={`${page.path}`}>
            <img src={`//localhost:7400/i/${page.img}?w=240&h=240`} alt={page.title} />
            <div class="title">{page.title}</div>
        </a>
    </div>
{/each}
</div>


<style lang="scss">
    .pages {
        display: grid;
        // grid-template-columns: repeat(6, 1fr);
        grid-template-columns: repeat(3, 1fr);

        width: 100%;
        max-width: 1000px;
        padding: 4rem 0;
    
        .page {
            width: 240px;
            height: 240px;
            margin: 2rem;
            position: relative;

            a {
                display: block;
                width: 100%;
                height: 100%;
                color: whitesmoke;
                position: relative;
            }

            img {
                width: 100%;
                height: 100%;
            }

            .title {
                position: absolute;
                bottom: 0%;
                padding: 7px 10px;
                width: 100%;
                background-color: white;
                color: #464646;
            }
        }
    }
</style>