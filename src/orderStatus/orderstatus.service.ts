import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {TIorderStatus,TSorderStatus, orderStatusTable } from "../drizzle/schema";

export const orderStatusService = async (limit?: number): Promise<TSorderStatus[] | null> => {
    if (limit) {
        return await db.query.orderStatusTable.findMany({
            limit: limit
        });
    }
    return await db.query.orderStatusTable.findMany();
}

export const getOrderStatusService = async (id: number): Promise<TIorderStatus | undefined> => {
    return await db.query.orderStatusTable.findFirst({
        where: eq(orderStatusTable.id, id)
    })
}

export const createOrderStatusService = async (OrderStatus: TIorderStatus) => {
    await db.insert(orderStatusTable).values(OrderStatus)
    return "OrderStatus created successfully";
}

export const updateOrderStatusService = async (id: number, OrderStatus: TIorderStatus) => {
    await db.update(orderStatusTable).set(OrderStatus).where(eq(orderStatusTable.id, id))
    return "OrderStatus updated successfully";
}

export const deleteOrderStatusService = async (id: number) => {
    await db.delete(orderStatusTable).where(eq(orderStatusTable.id, id))
    return "OrderStatus deleted successfully";
}