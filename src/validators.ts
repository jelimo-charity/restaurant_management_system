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

