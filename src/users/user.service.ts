import db from '../drizzle/db.js'
import { TSuser,TIuser, usersTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
//Get all users

export const usersService = async (limit?: number):Promise<TSuser[]  | null> => {
    if(limit) {
        return await db.query.usersTable.findMany({
            limit: limit
        });
    }
    return await db.query.usersTable.findMany();
}

//get a single user

export const getUserService = async(id: number): Promise<TSuser | undefined> =>{
    return await db.query.usersTable.findFirst({
        where: eq(usersTable.id, id)
    })
}

//create a new user
export const createUserService = async (user: TIuser) => {
    await db.insert(usersTable).values(user)
    return "User created successfully";
}

export const updateUserService = async (id: number, user: TIuser) => {
    await db.update(usersTable).set(user).where(eq(usersTable.id, id))
    return "User updated successfully";
}

export const deleteUserService = async (id: number) => {
    await db.delete(usersTable).where(eq(usersTable.id, id))
    return "User deleted successfully";
}

