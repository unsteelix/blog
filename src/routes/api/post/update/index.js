import db from '$lib/db'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request }) {

    // new
    const data = await request.json();

    if(!data){
        return {
            status: 404,
            body: 'нет входных данных'
        };
    }

    // old
    const { posts } = await db.data;

    if(!posts){
        return {
            status: 404,
            body: 'не удалось достать данные из БД'
        };
    }
    
    db.data.posts = data
    await db.write()

    const fromDB = await db.data.posts

    if (fromDB) {
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