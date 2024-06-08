import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {TIstatusCatalog,TSstatusCatalog, statusCatalogTable } from "../drizzle/schema";

export const StatusCatalogsService = async (limit?: number): Promise<TSstatusCatalog[] | null> => {
    if (limit) {
        return await db.query.statusCatalogTable.findMany({
            limit: limit
        });
    }
    return await db.query.statusCatalogTable.findMany();
}

export const getStatusCatalogService = async (id: number): Promise<TIstatusCatalog | undefined> => {
    return await db.query.statusCatalogTable.findFirst({
        where: eq(statusCatalogTable.id, id)
    })
}


export const createStatusCatalogService = async (StatusCatalog: TIstatusCatalog) => {
    await db.insert(statusCatalogTable).values(StatusCatalog)
    return "StatusCatalog created successfully";
}

export const updateStatusCatalogService = async (id: number, StatusCatalog: TIstatusCatalog) => {
    await db.update(statusCatalogTable).set(StatusCatalog).where(eq(statusCatalogTable.id, id))
    return "StatusCatalog updated successfully";
}

export const deleteStatusCatalogService = async (id: number) => {
    await db.delete(statusCatalogTable).where(eq(statusCatalogTable.id, id))
    return "StatusCatalog deleted successfully";
}