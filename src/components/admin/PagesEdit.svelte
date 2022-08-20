<script>
    import { onMount } from 'svelte'
    import { customAlphabet } from 'nanoid'
    import FileUpload from 'sveltefileuploadcomponent';
    import { picolaUrl } from '$src/lib/const'

    let isLoaded = false

    /**
    * @type {Array<any>}
    */
    let pages = []

    const onSaveBtnClick = async () => {
        isLoaded = false
        pages = await fetch(`/api/page/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pages) 
            
        }).then(res => res.json())
        isLoaded = true
    }

    const onDelBtnClick = (rowIndex) => {
        if(confirm('realy?')){
            pages.splice(rowIndex, 1)
            pages = pages
        }
    }

    const onInputChange = (rowIndex, input, value) => {
        pages[rowIndex][input] = value
    }

    const nanoid = customAlphabet('1234567890abcdef', 10)

    const onAddBtnClick = () => {
        const newPage = {
            id: nanoid(),
            path: '/some/new/path',
            title: 'title',
            img: 'img',
            postId: ''
        }
        pages.push(newPage)
        pages = pages
    }
    
    let uploadedImg

    const onFileChange = (file) => {
        const { files } = file.detail
        const formData = new FormData();

        formData.append('file', files);

        const upload = fetch(`${picolaUrl}/upload`, {
            method: 'POST',
            body: formData
        }).then((res) => res.json()).then((res) => {
            res.forEach(el => {
                uploadedImg = el.data.id
                setTimeout(() => {
                    uploadedImg = null
                }, 5000)
            })
        })
        .catch((err) => {
            console.error(err);
        });
    }

    onMount(async () => {
        pages = await fetch('/api/pages')
                        .then(res => res.json())
        isLoaded = true
    })
</script>

<div class="wrap">
    {#if isLoaded}
        {#each pages as page, index}
            <div class="onePage">
                <div class="path">
                    <input type="text" value={page.path} on:change={(e) => onInputChange(index, 'path', e.target?.value)} />
                </div>
                <div class="title">
                    <input type="text" value={page.title} on:change={(e) => onInputChange(index, 'title', e.target?.value)} />
                </div>
                <div class="img">
                    <input type="text" value={page.img} on:change={(e) => onInputChange(index, 'img', e.target?.value)} />
                </div>
                <div class="post">
                    <input type="text" value={page.postId} on:change={(e) => onInputChange(index, 'postId', e.target?.value)} />
                </div>
                <div on:click={() => onDelBtnClick(index)} class="del">
                    -
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
            <div class="uploadPhoto">
                <FileUpload multiple={false} on:input={onFileChange}>
                    +
                </FileUpload>
            </div>
            {#if uploadedImg}{uploadedImg}{/if}
        </div>
    {:else}
        Loading...
    {/if}
</div>

<style lang="scss">
    .wrap {
        border: 1px solid grey;
        max-width: 600px;
    
        .onePage {
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

            .img, .post {
                width: 60px;
            }

            .del {
                cursor: pointer;
                width: 20px;
                height: 100%;
                text-align: center;

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
            .uploadPhoto {
                width: 40px;
                display: flex;
                justify-content: center;
                align-items: center;
                &:hover{
                    background-color: cornflowerblue;
                    color: whitesmoke;
                }
            }
        }
    }
</style>