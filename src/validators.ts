import { serial } from 'drizzle-orm/pg-core';
import { z } from 'zod'


export const userSchema = z.object({
    id: z.number().int().optional(),
    name: z.string(),
    contact_phone: z.string(),
    phone_verified: z.string(),
    email: z.string(),
    email_verified: z.string(),
    confirmation_code: z.string(),
    password: z.string(),
    created_at: z.string(),
    updated_at: z.string(),
})


export const stateSchema = z.object({
    id: z.number().int().optional(),
    name: z.string(),
    code: z.string()
})

export const citySchema = z.object({
    id: z.number().int().optional(),
    name: z.string(),
    state_id: z.number()
})

export const restaurantSchema = z.object({
    id: z.number().int().optional(),
    name: z.string(),
    street_address: z.string(),
    zip_code: z.string(),
    city_id: z.number(),
  
})

export const categorySchema = z.object({
    id: z.number().int().optional(),
    name: z.string(),

})

export const menuItemSchema = z.object({
    id: z.number().int().optional(),
    name: z.string(),
    restaurant_id: z.number(),
    category_id: z.number(),
    description: z.string(),
    ingredients: z.string(),
    active: z.boolean()
})
export const addressSchema = z.object({
   id: z.number(),
   street_address_1: z.string(),
   street_address_2: z.string(),
   zip_code: z.string(),
   delivery_instructions: z.string(),
   user_id: z.number(),
   city_id: z.number()

})

export const commentSchema = z.object({
    id: z.number().optional(),
    order_id: z.number(),
    user_id: z.number(),
    comment_text: z.string(),
    is_complaint: z.boolean(),
    is_praise: z.boolean()
})

export const orderSchema = z.object({
    id: z.number().optional(),
    restaurant_id: z.number(),
    estimated_delivery_time: z.string(),
    delivery_address_id: z.number(),
    user_id: z.number(),
    driver_id: z.number(),
    price: z.number().multipleOf(0.01),
    discount: z.number(),
    final_price: z.number()
})

export const driverSchema = z.object({
    id: z.number().optional(),
    car_make: z.string(),
    car_model: z.string(),
    car_year: z.number(),
    user_id: z.number(),
    online: z.boolean(),
    delivering: z.boolean(),
    
})

export const orderMenuItemSchema = z.object({
    id: z.number().optional(),
    order_id: z.number(),
    menu_item_id: z.number(),
    quantity: z.number(),
    item_price: z.number().multipleOf(0.01),
   
})

export const orderStatusSchema = z.object({
    id: z.number().optional(),
    order_id: z.number(),
    status_catalog_id: z.number(),
})

export const restaurantOwnerSchema = z.object({
    id: z.number().optional(),
    restaurant_id: z.number(),
    owner_id: z.number(),
   
})

export const statusCatalogSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
})

