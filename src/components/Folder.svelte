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
            <img src={`//localhost:7400/i/${page.img}`} alt={page.title} />
            {page.title}
        </a>
    </div>
{/each}
</div>


<style lang="scss">
    .pages {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    
        .page {
            width: 240px;
            height: 240px;
            border: 1px solid gainsboro;
            margin: 2rem;
        }
    }
</style>