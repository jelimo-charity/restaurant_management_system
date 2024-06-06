import { Context } from "hono"
import { createUserService, deleteUserService, getUserService, updateUserService, usersService } from "./user.service"

//=============get all users============
export const getUsers = async (c:Context) =>{
    try {
        
        const limit = Number(c.req.query("limit"))

        const data = await usersService(limit);
        console.log(data)
        if (data == null || data.length == 0) {
              return c.text("user not found", 404)
        }
        return c.json(data, 200)
    } catch (error: any) {
        return c.json({ error: error?.message}, 400)
    }
}

//=============get a single user===========

export const getUser = async (c: Context) => {
    try {
       const id = parseInt(c.req.param("id"));
       if (isNaN(id)) return c.text("Wrong ID", 400);

       const user = await getUserService(id);
       if (user == undefined) {
        return c.text("User not found", 404);
    }
    return c.json(user, 200);
    } catch (error: any) {
        return c.json({error: error?.message}, 400)
    }
}

//=============create a user===========

export const createUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        const createdUser = await createUserService(user);


        if (!createdUser) return c.text("User not created", 404);
        return c.json({ msg: createdUser }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateUser = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {
        // search for the user
        const searchedUser = await getUserService(id);
        if (searchedUser == undefined) return c.text("User not found", 404);
        // get the data and update it
        const res = await updateUserService(id, user);
        // return a success message
        if (!res) return c.text("User not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteUser = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const user = await getUserService(id);
        if (user == undefined) return c.text("User not found", 404);
        //deleting the user
        const res = await deleteUserService(id);
        if (!res) return c.text("User not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

