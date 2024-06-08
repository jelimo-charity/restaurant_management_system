import { Hono } from "hono";
import { getUsers, getUser, createUser, updateUser, deleteUser } from "./user.controller";
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validators";


export const userRouter = new Hono();

//get  all users
userRouter.get('/users', getUsers)
userRouter.get('/users/:id', getUser)

//create a user
userRouter.post("/users", zValidator("json", userSchema, (result, c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}), createUser)

//update a user
userRouter.put("/users/:id", updateUser)

userRouter.delete("/users/:id", deleteUser)