import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIorderMenu, TSorderMenu, orderMenuTable } from "../drizzle/schema";

export const OrderMenuItemsService = async (limit?: number): Promise<TSorderMenu[] | null> => {
    if (limit) {
        return await db.query.orderMenuTable.findMany({
            limit: limit
        });
    }
    return await db.query.orderMenuTable.findMany();
}

export const getOrderMenuItemService = async (id: number): Promise<TIorderMenu | undefined> => {
    return await db.query.orderMenuTable.findFirst({
        where: eq(orderMenuTable.id, id)
    })
}

export const createOrderMenuItemService = async (OrderMenuItem: TIorderMenu) => {
    await db.insert(orderMenuTable).values(OrderMenuItem)
    return "OrderMenuItem created successfully";
}

export const updateOrderMenuItemService = async (id: number, OrderMenuItem: TIorderMenu) => {
    await db.update(orderMenuTable).set(OrderMenuItem).where(eq(orderMenuTable.id, id))
    return "OrderMenuItem updated successfully";
}

export const deleteOrderMenuItemService = async (id: number) => {
    await db.delete(orderMenuTable).where(eq(orderMenuTable.id, id))
    return "OrderMenuItem deleted successfully";
}