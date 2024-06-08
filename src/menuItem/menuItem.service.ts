import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TImenuItem, TSmenuItem, menuItemTable } from "../drizzle/schema";

export const menuItemService = async (limit?: number): Promise<TSmenuItem[] | null> => {
    if (limit) {
        return await db.query.menuItemTable.findMany({
            limit: limit
        });
    }
    return await db.query.menuItemTable.findMany();
}

export const getmenuItemService = async (id: number): Promise<TImenuItem | undefined> => {
    return await db.query.menuItemTable.findFirst({
        where: eq(menuItemTable.id, id)
    })
}

export const createmenuItemService = async (menu: TImenuItem) => {
    await db.insert(menuItemTable).values(menu)
    return "menu created successfully";
}

export const updatemenuItemService = async (id: number, menu: TImenuItem) => {
    await db.update(menuItemTable).set(menu).where(eq(menuItemTable.id, id))
    return "menu updated successfully";
}

export const deletemenuItemService = async (id: number) => {
    await db.delete(menuItemTable).where(eq(menuItemTable.id, id))
    return "menu deleted successfully";
}