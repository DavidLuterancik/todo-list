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
            message: `too_short`,
        })
        .max(MAX_NAME_LENGHT, { message: 'too_long' }),
    deadline: z
        .custom((value) => (isValidMoment(value) ? value : null))
        .nullable(),
})

export const TodoSchema = z.object({
    title: z
        .string()
        .min(MIN_TITLE_LENGHT, {
            message: `too_short`,
        })
        .max(MAX_TITLE_LENGHT, { message: 'too_long' }),
    items: z.array(ItemSchema),
    date: z.custom((value) => (isValidMoment(value) ? value : null), {
        message: 'date_required',
    }),
})
