import db from '$lib/db'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request, params }) {

    const { id } = params
    if(!id){
        return {
            status: 404,
            body: 'не передан id'
        };
    }

    // new
    const newData = await request.json();

    if(!newData){
        return {
            status: 404,
            body: 'нет входных данных'
        };
    }

    const posts = await db.data.posts;
    // old
    // если старых данных нет, то просто создаем новые
    const old = posts.find(post => post.id === id);

    const updated = {
        ...old,
        ...newData
    }

    // сохраняем в БД
    /**
     * @type {any[]}
     */
    const newArr = []
    posts.forEach(post => {
        if(post.id === id){
            newArr.push(updated)
        } else {
            newArr.push(post)
        }
    });
    

    db.data.posts = newArr
    await db.write()

    const fromDB = await db.data.posts.find(post => post.id === id);

    if (updated) {
        return {
            status: 200,
            headers: {
              'access-control-allow-origin': '*'
            },
            body: fromDB
          };
    }

    return {
        status: 404
    };
}