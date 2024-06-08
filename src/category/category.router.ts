import { Hono } from "hono";
import { listCategories, getCategory, createCategory, updateCategory, deleteCategory } from "./category.controller"
import { zValidator } from "@hono/zod-validator";
import { categorySchema } from "../validators";
export const categoryRouter = new Hono();

//get all categorys      api/categorys
categoryRouter.get("/category", listCategories);
//get a single category    api/categorys/1
categoryRouter.get("/category/:id", getCategory)
// create a category 
categoryRouter.post("/category", zValidator('json', categorySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createCategory)
//update a category
categoryRouter.put("/category/:id", updateCategory)

categoryRouter.delete("/category/:id", deleteCategory)

//https:domai.com/api/categorys?limit=10