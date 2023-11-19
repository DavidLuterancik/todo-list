import { z } from 'zod'
import moment from 'moment'

const isValidMoment = (value) => moment(value, moment.ISO_8601, true).isValid()

export const ItemSchema = z.object({
    name: z.string().min(3, { message: 'Name must be 3 or more characters' }),
    checked: z.boolean(),
    deadline: z
        .custom((value) => (isValidMoment(value) ? value : null))
        .nullable(),
})

export const TodoSchema = z.object({
    title: z.string().min(3, { message: 'Title must be 3 or more characters' }),
    items: z.array(ItemSchema),
    date: z.custom((value) => (isValidMoment(value) ? value : null), { message: 'Date is required' }),
})
