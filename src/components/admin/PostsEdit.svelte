<script>
    import { onMount } from 'svelte'

    let isLoaded = false

    /**
    * @type {Array<any>}
    */
    let posts = []

    const onSaveBtnClick = async () => {
        isLoaded = false
        posts = await fetch(`/api/post/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(posts) 
            
        }).then(res => res.json())
        isLoaded = true
    }

    const onDelBtnClick = (rowIndex) => {
        if(confirm('realy?')){
            posts.splice(rowIndex, 1)
            posts = posts
        }
    }

    const onInputChange = (rowIndex, input, value) => {
        posts[rowIndex][input] = value
    }

    const onAddBtnClick = () => {
        const newPost = {
            id: 'new-id',
            title: 'some-title',
            date: 'some-date',
            img: 'some-img',
            text: 'some-text'
        }
        posts.push(newPost)
        posts = posts
    }
    
    onMount(async () => {
        posts = await fetch('/api/posts')
                        .then(res => res.json())
        isLoaded = true
    })
</script>

<div class="wrap">
    {#if isLoaded}
        {#each posts as post, index}
            <div class="onePost">
                <div class="link">
                    <a href={`/admin/post/${post.id}`}>edit</a>
                </div>
                <div class="title">
                    <input type="text" value={post.title} on:change={(e) => onInputChange(index, 'title', e.target?.value)} />
                </div>
                <div class="date">
                    <input type="text" value={post.date} on:change={(e) => onInputChange(index, 'date', e.target?.value)} />
                </div>
                <div class="img">
                    <input type="text" value={post.img} on:change={(e) => onInputChange(index, 'img', e.target?.value)} />
                </div>
                <div on:click={() => onDelBtnClick(index)} class="del">
                    del
                </div>
            </div>
        {/each}
        <div class="btns">
            <div on:click={() => onAddBtnClick()} class="add">
                add
            </div>
            <div on:click={() => onSaveBtnClick()} class="save">
                save
            </div>
        </div>
    {:else}
        Loading...
    {/if}
</div>

<style lang="scss">
    .wrap {
        border: 1px solid grey;
        max-width: 600px;
    
        .onePost {
            border-bottom: 2px solid cornflowerblue;


            
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            input {
                padding: 0.4rem;
                border: none;
                outline: none;
                width: 100%;


                &:focus{
                    background-color: cornflowerblue;
                    color: whitesmoke;                   
                }
            }

            .img {
                width: 60px;
            }

            .del {
                cursor: pointer;
                width: 25px;
                height: 100%;

                &:hover{
                    background-color: cornflowerblue;
                    color: whitesmoke;                
                }
            }
        }
        .btns{
            display: flex;
            justify-content: space-between;
            .add, .save {
                padding: 0.2rem;
                cursor: pointer;
                width: 100%;
                text-align: center;

                &:hover{
                    background-color: cornflowerblue;
                    color: whitesmoke;
                }
            }
        }
    }
</style>