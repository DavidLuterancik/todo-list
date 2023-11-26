import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { ActiveSelectProps, ItemStatus } from '../../types/types'
import { useTranslation } from 'react-i18next'

export default function ActiveSelect({ value, onChange }: ActiveSelectProps) {
    const { t } = useTranslation()

    return (
        <FormControl
            sx={{
                width: 128,
            }}
        >
            <InputLabel id="item-select-label">{t('Item_Status')}</InputLabel>
            <Select
                labelId="item-select-label"
                id="item-select"
                value={value}
                onChange={onChange}
            >
                {Object.values(ItemStatus).map((status) => (
                    <MenuItem key={status} value={status}>
                        {t(status)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
