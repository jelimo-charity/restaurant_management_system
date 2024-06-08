import { addressTable } from './../drizzle/schema';
import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIaddress, TSaddress } from "../drizzle/schema";

export const addressService = async (limit?: number): Promise<TSaddress[] | null> => {
    if (limit) {
        return await db.query.addressTable.findMany({
            limit: limit
        });
    }
    return await db.query.addressTable.findMany();
}

export const getAddressService = async (id: number): Promise<TSaddress | undefined> => {
    console.log(addressTable.id);
    return await db.query.addressTable.findFirst({
        where: eq(addressTable.id, id)
    })
}

export const createAddressService = async (Address: TIaddress) => {
    await db.insert(addressTable).values(Address)
    return "Address created successfully";
}

export const updateAddressService = async (id: number, Address: TIaddress) => {
    await db.update(addressTable).set(Address).where(eq(addressTable.id, id))
    return "Address updated successfully";
}

export const deleteAddressService = async (id: number) => {
    await db.delete(addressTable).where(eq(addressTable.id, id))
    return "Address deleted successfully";
}