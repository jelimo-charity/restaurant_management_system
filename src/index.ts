import 'dotenv/config'
import db from './drizzle/db'
import { cityTable, cityRelations } from './drizzle/schema';
import { Column } from 'drizzle-orm';

 type TScity = typeof cityTable.$inferSelect;
//query
const getcities = async () :Promise<TScity[] | null> =>{
    return await db.query.cityTable.findMany()
}




async function main() {
    console.log(await getcities());
   
}
main()
