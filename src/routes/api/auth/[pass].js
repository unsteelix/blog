import db from '$lib/db'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function GET({ params }) {    

    const adminPass = 'nadkir' // 12345678
    const token = 'bc3c2cd107'

    const { pass } = params
    
    if(!pass){
        return {
            status: 404,
            body: 'не передан pass'
        };
    }


    return {
        status: 200,
        body: pass !== adminPass ? '' : token
    };
}