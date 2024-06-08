import { Hono } from "hono";
import { createState, deleteState, getState, getStates, updateState } from "./state.controller";
import { citySchema } from "../validators";
import { zValidator } from "@hono/zod-validator";

export const stateRouter = new Hono();

//get  all states
stateRouter.get('/states', getStates)
stateRouter.get('/states/:id', getState)

//create a state
stateRouter.post("/states", zValidator("json", citySchema, (result, c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}), createState)

//update a user
stateRouter.put("/states/:id", updateState)

stateRouter.delete("/states/:id", deleteState)