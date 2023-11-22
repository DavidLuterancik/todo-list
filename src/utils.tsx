import moment from 'moment'
import { colors } from '@mui/material'

export const MIN_TITLE_LENGHT = import.meta.env.VITE_MIN_TITLE_LENGHT
export const MAX_TITLE_LENGHT = import.meta.env.VITE_MAX_TITLE_LENGHT
export const MIN_NAME_LENGHT = import.meta.env.VITE_MIN_NAME_LENGHT
export const MAX_NAME_LENGHT = import.meta.env.VITE_MAX_NAME_LENGHT

export function randomNumber(minimum: number, maximum: number) {
    return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum
}

export function getDeadlineColor(checked: boolean, deadline: string | null) {
    const isPast = moment(deadline).diff(moment()) < 0

    if (!checked && isPast) {
        return colors.blue[500]
    }
    return 'textSecondary'
}

export function isAfterDeadline(checked: boolean, deadline: string | null) {
    const isPast = moment(deadline).diff(moment()) < 0

    if (!checked && isPast) {
        return true
    }
    return false
}

export function getMaxLenght(length: number, maxLength: number) {
    if (maxLength - length < maxLength * 0.2) {
        return `${length}/${maxLength}`
    }
    return null
}
