import db from '$lib/db'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ params }) {

    const { id } = params
    if(!id){
        return {
            status: 404,
            body: 'не передан id'
        };
    }

    // сохраняем в БД
    db.data.posts[id] = undefined
    await db.write()

    const fromDB = db.data.posts[id]

    if (!fromDB) {
        return {
            status: 200,
            headers: {
              'access-control-allow-origin': '*'
            },
            body: {
                [id]: "post successfully deleted"
            }
          };
    }

    return {
        status: 404
    };
}