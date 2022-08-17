import { join, dirname } from 'path'
import { Low, JSONFile } from 'lowdb'


// Use JSON file for storage
const file = join('src/../volume', 'db.json')
const adapter = new JSONFile(file)
const db = new Low(adapter)

// Read data from JSON file, this will set db.data content
await db.read()

// If file.json doesn't exist, db.data will be null
// Set default data
db.data ||= { 
    pages: [],
    posts: [] 
}            

await db.write()


export default db