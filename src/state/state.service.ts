import db from '../drizzle/db'
import { TSstate,TIstate, stateTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
//Get all users

export const getStatesService = async (limit?: number):Promise<TSstate[]> => {
    if(limit) {
        return await db.query.stateTable.findMany({
            limit: limit
        });
    }
    return await db.query.stateTable.findMany();
}

//get a single state

export const getStateService = async(id: number) =>{
   const states = await db.query.stateTable.findFirst({
        where: eq(stateTable.id, id)
    
    });
    return states ?? null
}

//create a new state
export const createStateService = async (state: TIstate) => {
    await db.insert(stateTable).values(state)
    return "state created successfully";
}

export const updateStateService = async (id: number, state: TIstate) => {
    await db.update(stateTable).set(state).where(eq(stateTable.id, id))
    return "state updated successfully";
}

export const deleteStateService = async (id: number) => {
    await db.delete(stateTable).where(eq(stateTable.id, id))
    return "state deleted successfully";
}

