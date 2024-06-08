import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {TSrestaurantOwner,TIrestaurantOwner, restaurantOwnerTable } from "../drizzle/schema";

export const restuarantOwnersService = async (limit?: number): Promise<TSrestaurantOwner[] | null> => {
    if (limit) {
        return await db.query.restaurantOwnerTable.findMany({
            limit: limit
        });
    }
    return await db.query.restaurantOwnerTable.findMany();
}

export const getRestuarantOwnerService = async (id: number): Promise<TIrestaurantOwner | undefined> => {
    return await db.query.restaurantOwnerTable.findFirst({
        where: eq(restaurantOwnerTable.id, id)
    })
}

export const createRestuarantOwnerService = async (RestuarantOwner: TIrestaurantOwner) => {
    await db.insert(restaurantOwnerTable).values(RestuarantOwner)
    return "RestuarantOwner created successfully";
}

export const updateRestuarantOwnerService = async (id: number, RestuarantOwner: TIrestaurantOwner) => {
    await db.update(restaurantOwnerTable).set(RestuarantOwner).where(eq(restaurantOwnerTable.id, id))
    return "RestuarantOwner updated successfully";
}

export const deleteRestuarantOwnerService = async (id: number) => {
    await db.delete(restaurantOwnerTable).where(eq(restaurantOwnerTable.id, id))
    return "RestuarantOwner deleted successfully";
}