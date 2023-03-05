import { appendFileSync } from 'node:fs';
import { join } from 'path'
import fs from 'fs';
import { customAlphabet  } from 'nanoid'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function POST({ request, params }) {

    // new
    const videoData = await request.formData();
    const file = videoData.get("file") as File;

    if(!videoData || !file){
        return {
            status: 404,
            body: 'нет входных данных'
        };
    }

    const nanoid = customAlphabet('1234567890abcdef', 10)
    const id = nanoid()
    const ext = file.name.split('.')[1]
    const newName = `${id}.${ext}`

    try {
        const folderPath = 'src/../volume/videos'
        const filePath = join(folderPath, newName)

        try {
            if (!fs.existsSync(folderPath)){
                fs.mkdirSync(folderPath)
            }
        } catch (err) {
            console.error(err)
        }

        await fs.promises.writeFile(filePath, file.stream());

        return {
            status: 200,
            headers: {
              'access-control-allow-origin': '*'
            },
            body: {
                id: newName
            }
        };

    } catch (err) {
        return {
            status: 404,
        };
    }

}