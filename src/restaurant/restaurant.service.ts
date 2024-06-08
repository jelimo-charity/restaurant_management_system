import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {TIrestaurant,TSrestaurant, restaurantTable } from "../drizzle/schema";

export const restaurantService = async (limit?: number): Promise<TSrestaurant[] | null> => {
    if (limit) {
        return await db.query.restaurantTable.findMany({
            limit: limit
        });
    }
    return await db.query.restaurantTable.findMany();
}

export const getRestaurantService = async (id: number): Promise<TIrestaurant | undefined> => {
    return await db.query.restaurantTable.findFirst({
        where: eq(restaurantTable.id, id)
    })
}

export const createRestaurantService = async (Restaurant: TIrestaurant) => {
    await db.insert(restaurantTable).values(Restaurant)
    return "Restaurant created successfully";
}

export const updateRestaurantService = async (id: number, Restaurant: TIrestaurant) => {
    await db.update(restaurantTable).set(Restaurant).where(eq(restaurantTable.id, id))
    return "Restaurant updated successfully";
}

export const deleteRestaurantService = async (id: number) => {
    await db.delete(restaurantTable).where(eq(restaurantTable.id, id))
    return "Restaurant deleted successfully";
}