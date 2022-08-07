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
    const { pages } = await db.data;

    if(!pages){
        return {
            status: 404,
            body: 'не удалось достать данные из БД'
        };
    }

    const updated = {
        ...pages,
        ...data
    }

    if (updated) {
        return {
            status: 200,
            headers: {
              'access-control-allow-origin': '*'
            },
            body: {
              ...updated
            }
          };
    }

    return {
        status: 404
    };
}