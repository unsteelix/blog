<script>
// @ts-nocheck

    import { onMount } from 'svelte'
    import { page } from '$app/stores';
    import {flip} from "svelte/animate";
    import {dndzone} from "svelte-dnd-action";
    import Tiptap from '$lib/tiptap/index.svelte'
    import { customAlphabet } from 'nanoid'
    import FileUpload from 'sveltefileuploadcomponent';
    import Img from '$components/admin/images/index.svelte';
    import { picolaUrl } from '$src/lib/const'

    const { id } = $page.params;

    let isLoaded = false;
    /**
    * @type {{ blocks: any[]; id: string; }}
    */
    let post
    /**
    * @type {any[]}
    */
    let items = []

    const types = [
        {
            id: 'text',
            title: 'Text'
        },
        {
            id: 'img-wide',
            title: 'Wide'
        },
        {
            id: 'img-padding',
            title: 'Pad'
        },
    ]

    let mode = {} // карта состояния блоков: preview/edit
    const flipDurationMs = 300;
    const handleDndConsider = (e) => {
        items = e.detail.items;
    }
    const handleDndFinalize = (e) => {
        items = e.detail.items;
    }

    const nanoid = customAlphabet('1234567890abcdef', 10)

    const onAddBtnClick = () => {
        const newBlock = {
            id: nanoid(),
            type: 'text',
            value: ''
        }
        items.push(newBlock)
        mode[newBlock.id] = 'edit'
        items = items
    }

    const onSaveBtnClick = async () => {
        isLoaded = false
        let updatedPost = await fetch(`/api/post/update/${post.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...post,
                blocks: items 
            }) 
            
        }).then(res => res.json())

        mode = {}
        post = updatedPost
        items = post.blocks
        isLoaded = true
    }

    const onTypeClick = (itemId, typeId) => {
        const item = items.find(item => item.id === itemId)
        item.type = typeId
        items = items
    }

    const onTextFieldChange = (itemId, html) => {
        const item = items.find(item => item.id === itemId)
        item.value = html
        items = items
    }

    const onModeClick = (itemId) => {
        if(!mode[itemId] || mode[itemId] === 'preview'){
            mode[itemId] = 'edit'
        } else {
            mode[itemId] = 'preview'
        }
    }

    const onDelClick = (itemId) => {
        if(confirm('are you sure?')){
            const index = items.findIndex(i => i.id === itemId)
            items.splice(index, 1)
            items = items
        }
    }

    const onFileChange = (itemId, file) => {
        const { files } = file.detail
        const formData = new FormData();

        files.forEach((el, i) => {
            formData.append(`file_${i}`, el);
        });

        const upload = fetch(`${picolaUrl}/upload`, {
            method: 'POST',
            body: formData
        }).then((res) => res.json()).then((res) => {
            const item = items.find(item => item.id === itemId)

            res.forEach(el => {
                item.value += `<p>${el.data.id}</p>`
            })
            items = items
            mode[itemId] = 'preview'
        })
        .catch((err) => {
            console.error(err);
        });
    }

    onMount(async () => {
        post = await fetch(`/api/post/${id}`)
                        .then(res => res.json())

        items = post.blocks
        isLoaded = true
    })
</script>

<div class="wrap">
    {#if isLoaded}

    <div class="btns">
        <div on:click={() => onAddBtnClick()} class="add">
            add
        </div>
        <div on:click={() => onSaveBtnClick()} class="save">
            save
        </div>
    </div>

    <section use:dndzone="{{items, flipDurationMs}}" on:consider="{handleDndConsider}" on:finalize="{handleDndFinalize}" class="blocks">
        {#each items as item(item.id)}
            <div animate:flip="{{duration: flipDurationMs}}" class="oneBlock">
                <div class="left">
                    <div class="types">
                        <div class={`oneType ${(!mode[item.id] || (mode[item.id] === 'preview')) ? 'selected' : ''}`} on:click={() => onModeClick(item.id)}>P</div>
                        {#each types as type}
                            <div class={`oneType ${type.id === item.type ? 'selected' : ''}`} on:click={() => onTypeClick(item.id, type.id)}>{type.title}</div>
                        {/each}
                        <div class="uploadPhoto">
                            <FileUpload multiple={true} on:input={(file) => onFileChange(item.id, file)}>
                                +
                            </FileUpload>    
                        </div>
                        <div class="oneType" on:click={() => onDelClick(item.id)}>-</div>
                    </div>
                </div>
                <div class="right">
                    {#if mode[item.id] === 'edit'}
                        {#if item.type === 'text'}
                            <Tiptap content={item.value} onUpdateCallback={(html) => onTextFieldChange(item.id, html)}/>
                        {:else}
                            <!-- <input type="text" /> -->
                            <Tiptap content={item.value} onUpdateCallback={(html) => onTextFieldChange(item.id, html)}/>
                        {/if}
                    {:else}
                        {#if item.type === 'text'}
                            {@html item.value}
                        {:else}
                            <Img type={item.type} data={item.value} />
                        {/if}
                    {/if}
                </div>
            </div>
        {/each}
    </section>


        <div class="btns bottom">
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
    .wrap{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        width: 100%;

        .blocks {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
            align-content: stretch;
            width: 100%;
            max-width: 800px;
        
            .oneBlock {
                border-top: 1px solid gainsboro;
                border-right: 1px solid gainsboro;
                width: 100%;
                min-height: 200px;
                display: flex;
                justify-content: space-between;
                cursor: default;

                .left {
                    border-right: 1px solid gainsboro;
                    border-left: 1px solid gainsboro;
                    border-top: 0px solid gainsboro;
                    cursor: pointer;

                    .uploadPhoto {
                        text-align: center;
                        border-bottom: 1px solid gainsboro;
                        width: 30px;
                        height: 30px;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                    }

                    .types {
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;

                        .selected {
                            font-weight: bold;
                        }

                        .oneType {
                            border-bottom: 1px solid gainsboro;
                            width: 30px;
                            height: 30px;
                            font-size: 12px;
                            text-align: center;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            align-items: center;
                        }
                    }
                }

                .right {
                    cursor: text;
                    width: 100%;
                }
            }
        }

        .btns {
            display: flex;
            justify-content: space-between;
            width: 100%;
            max-width: 800px;
            border-left: 1px solid gainsboro;

            &.bottom {
                border-top: 1px solid gainsboro;
            }

            .add, .save {
                padding: 0.5rem;
                cursor: pointer;
                width: 100%;
                text-align: center;
                border-right: 1px solid gainsboro;

                &:hover{
                    background-color: cornflowerblue;
                    color: whitesmoke;
                }
            }
        }

    }

</style>