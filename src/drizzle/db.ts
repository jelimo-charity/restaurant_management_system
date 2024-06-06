import 'dotenv/config'
import {drizzle} from 'drizzle-orm/node-postgres'
import * as schema from './schema'
import {Client}   from 'pg'

export const client = new Client({
    connectionString: process.env.Database_URL as string,
})

const main = async () =>{
    await client .connect() 
}
main()

 const db = drizzle(client, {schema, logger: true})  //create a drizzle instance
 export default db;  //export the drizzle instance