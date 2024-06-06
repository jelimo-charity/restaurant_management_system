import { Hono } from "hono";
import { createState, deleteState, getState, getStates, updateState } from "./state.controller";


export const stateRouter = new Hono();

//get  all states
stateRouter.get('/states', getStates)
stateRouter.get('/states/:id', getState)

//create a state
stateRouter.post("/states", createState)


//update a user
stateRouter.put("/states/:id", updateState)

stateRouter.delete("/states/:id", deleteState)