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

    const pages = await db.data.pages;
    // old
    // если старых данных нет, то просто создаем новые
    const old = pages.find(page => page.id === id);

    const updated = {
        ...old,
        ...newData
    }

    // сохраняем в БД
    /**
     * @type {any[]}
     */
    const newArr = []
    pages.forEach(page => {
        if(page.id === id){
            newArr.push(updated)
        } else {
            newArr.push(page)
        }
    });
    

    db.data.pages = newArr
    await db.write()

    const fromDB = await db.data.pages.find(page => page.id === id);

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