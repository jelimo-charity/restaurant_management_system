import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIorders, TSorders, ordersTable } from "../drizzle/schema";

export const OrdersService = async (limit?: number): Promise<TSorders[] | null> => {
    if (limit) {
        return await db.query.ordersTable.findMany({
            limit: limit
        });
    }
    return await db.query.ordersTable.findMany();
}

export const getOrderService = async (id: number): Promise<TIorders | undefined> => {
    return await db.query.ordersTable.findFirst({
        where: eq(ordersTable.id, id)
    })
}

export const createOrderService = async (Order: TIorders) => {
    await db.insert(ordersTable).values(Order)
    return "Order created successfully";
}

export const updateOrderService = async (id: number, Order: TIorders) => {
    await db.update(ordersTable).set(Order).where(eq(ordersTable.id, id))
    return "Order updated successfully";
}

export const deleteOrderService = async (id: number) => {
    await db.delete(ordersTable).where(eq(ordersTable.id, id))
    return "Order deleted successfully";
}