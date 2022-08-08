import db from '$lib/db'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {

    const { pages } = await db.data;

    if (pages) {
        return {
            status: 200,
            headers: {
              'access-control-allow-origin': '*'
            },
            body: pages
          };
    }

    return {
        status: 404
    };
}