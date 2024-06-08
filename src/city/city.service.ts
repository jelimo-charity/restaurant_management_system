import db from '../drizzle/db.js'
import { cityTable } from '../drizzle/schema.js';
import { TIcity, TScity } from '../drizzle/schema.js';
import { eq } from 'drizzle-orm';
//Get all cities

export const getcitiesService = async (limit?: number):Promise<TScity[]  | null> => {
    if(limit) {
        return await db.query.cityTable.findMany({
            limit: limit
        });
    }
    return await db.query.cityTable.findMany();
}

//get a single user

export const getCityService = async(id: number): Promise<TScity | undefined> =>{
    return await db.query.cityTable.findFirst({
        where: eq(cityTable.id, id)
    })
}

//create a new user
export const createCityService = async (city: TIcity) =>{
    await db.insert(cityTable).values(city)
    return "city created successfully";
}

export const updateCityService = async (id: number, city: TIcity) => {
    await db.update(cityTable).set(city).where(eq(cityTable.id, id))
    return "city updated successfully";
}

export const deleteCityService = async (id: number) => {
    await db.delete(cityTable).where(eq(cityTable.id, id))
    return "city deleted successfully";
}

