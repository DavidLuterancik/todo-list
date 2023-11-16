import { z } from 'zod'

export const ItemSchema = z.object({
    name: z.string().min(3, { message: 'Name must be 3 or more characters' }),
    checked: z.boolean(),
    deadline: z.string().nullable(),
})

export const TodoSchema = z.object({
    title: z.string().min(3, { message: 'Name must be 3 or more characters' }),
    items: z.array(ItemSchema),
    date: z.string(),
})
