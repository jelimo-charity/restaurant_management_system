import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIdrivers, TSdrivers, driversTable } from "../drizzle/schema";

export const driversService = async (limit?: number): Promise<TSdrivers[] | null> => {
    if (limit) {
        return await db.query.driversTable.findMany({
            limit: limit
        });
    }
    return await db.query.driversTable.findMany();
}

export const getDriverService = async (id: number): Promise<TIdrivers | undefined> => {
    return await db.query.driversTable.findFirst({
        where: eq(driversTable.id, id)
    })
}

export const createDriverService = async (Driver: TIdrivers) => {
    await db.insert(driversTable).values(Driver)
    return "Driver created successfully";
}

export const updateDriverService = async (id: number, Driver: TIdrivers) => {
    await db.update(driversTable).set(Driver).where(eq(driversTable.id, id))
    return "Driver updated successfully";
}

export const deleteDriverService = async (id: number) => {
    await db.delete(driversTable).where(eq(driversTable.id, id))
    return "Driver deleted successfully";
}