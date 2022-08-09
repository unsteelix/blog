import db from '$lib/db'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ params }) {

    const post = await db.data.posts.find(post => post.id === params.id);

    if (post) {
        return {
            status: 200,
            headers: {
              'access-control-allow-origin': '*'
            },
            body: post
          };
    }

    return {
        status: 404
    };
}