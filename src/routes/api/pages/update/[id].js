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

    // old
    // если старых данных нет, то просто создаем новые
    const old = await db.data.pages[id]

    const updated = {
        ...old,
        ...newData
    }

    // сохраняем в БД
    db.data.pages[id] = updated
    await db.write()

    const fromDB = db.data.pages[id]

    if (updated) {
        return {
            status: 200,
            headers: {
              'access-control-allow-origin': '*'
            },
            body: {
                [id]: {
                    ...fromDB
                }
            }
          };
    }

    return {
        status: 404
    };
}