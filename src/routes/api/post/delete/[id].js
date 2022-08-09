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

    /**
     * @type {any[]}
     */
    const newArr = [] 
    db.data.posts.forEach((/** @type {{ id: string; }} */ el) => {
        if(el.id !== id){
            newArr.push(el)
        }
    });

    // сохраняем в БД
    db.data.posts = newArr
    await db.write()

    // проверяем, удален ли элемент
    const fromDB = await db.data.posts.find(page => page.id === id);

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