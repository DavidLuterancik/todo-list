import { z } from 'zod'
import moment from 'moment'
import {
    MIN_NAME_LENGHT,
    MAX_NAME_LENGHT,
    MIN_TITLE_LENGHT,
    MAX_TITLE_LENGHT,
} from '../utils'

const isValidMoment = (value) => moment(value, moment.ISO_8601, true).isValid()

export const ItemSchema = z.object({
    checked: z.boolean(),
    name: z
        .string()
        .min(MIN_NAME_LENGHT, {
            message: `Name must be ${MIN_NAME_LENGHT} or more characters`,
        })
        .max(MAX_NAME_LENGHT, { message: 'Name is too long!' }),
    deadline: z
        .custom((value) => (isValidMoment(value) ? value : null))
        .nullable(),
})

export const TodoSchema = z.object({
    title: z
        .string()
        .min(MIN_TITLE_LENGHT, {
            message: `Title must be ${MIN_TITLE_LENGHT} or more characters`,
        })
        .max(MAX_TITLE_LENGHT, { message: 'Title is too long!' }),
    items: z.array(ItemSchema),
    date: z.custom((value) => (isValidMoment(value) ? value : null), {
        message: 'Date is required',
    }),
})
