import { Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'

export default function Empty() {
    const { t } = useTranslation()
    return (
        <Typography variant="body2" color={'textSecondary'}>
            {t('empty_text')}
        </Typography>
    )
}
