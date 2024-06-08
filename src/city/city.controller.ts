import { Context } from "hono"
import { createCityService, deleteCityService, getCityService, getcitiesService, updateCityService } from "./city.service";

//=============get all states============
export const getCities = async (c:Context) =>{
    try {
        
        const limit = Number(c.req.query("limit"))

        const data = await getcitiesService(limit);
        console.log(data)
        if (data == null || data.length == 0) {
              return c.text("city not found", 404)
        }
        return c.json(data, 200)
    } catch (error: any) {
        return c.json({ error: error?.message}, 400)
    }
}

//=============get a single city===========

export const getCity = async (c: Context) => {
    try {
       const id = parseInt(c.req.param("id"));
       if (isNaN(id)) return c.text("Wrong ID", 400);

       const city = await getCityService(id);
       if (city == undefined) {
        return c.text("city not found", 404);
    }
    return c.json(city, 200);
    } catch (error: any) {
        return c.json({error: error?.message}, 400)
    }
}

//=============create a city===========

export const createCity = async (c: Context) => {
    try {
        const city = await c.req.json();
        const createdCity = await createCityService(city);


        if (!createdCity) return c.text("city not created", 404);
        return c.json({ msg: createdCity }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateCity = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const state = await c.req.json();
    try {
        // search for the CITY
        const searchedCity = await getCityService(id);
        if (searchedCity == undefined) return c.text("City not found", 404);
        // get the data and update it
        const res = await updateCityService(id, state);
        // return a success message
        if (!res) return c.text("state not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteCity = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the city
        const state = await getCityService(id);
        if (state == undefined) return c.text("city not found", 404);
        //deleting the city
        const res = await deleteCityService(id);
        if (!res) return c.text("city not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}


