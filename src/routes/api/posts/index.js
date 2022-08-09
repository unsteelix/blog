import db from '$lib/db'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET() {

    const { posts } = await db.data;

    if (posts) {
        return {
            status: 200,
            headers: {
              'access-control-allow-origin': '*'
            },
            body: posts
          };
    }

    return {
        status: 404
    };
}