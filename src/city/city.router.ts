import { Hono } from "hono";
import { citySchema } from "../validators";
import { zValidator } from "@hono/zod-validator";
import { createCity, deleteCity, getCities, getCity, updateCity } from "./city.controller";

export const cityRouter = new Hono();

//get  all cities
cityRouter.get('/cities', getCities)
cityRouter.get('/cities/:id', getCity)

//create a city
cityRouter.post("/cities", zValidator("json", citySchema, (result, c) =>{
    if(!result.success){
        return c.json(result.error,400)
    }
}), createCity)

//update a user
cityRouter.put("/cities/:id", updateCity)

cityRouter.delete("/cities/:id", deleteCity)