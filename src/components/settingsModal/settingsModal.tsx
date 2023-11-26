import { Box, Stack, Typography } from '@mui/material'
import React from 'react'

import DarkModeToggle from './darkModeToggle'
import LanguageToggle from './languageToggle'
import { useTranslation } from 'react-i18next'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    borderRadius: 4,
    p: 4,
}

export default function SettingsModal() {
    const { t } = useTranslation()

    return (
        <Box sx={style}>
            <Typography variant="h4" gutterBottom>
                {t('Settings')}
            </Typography>

            <Stack spacing={2}>
                <Typography gutterBottom>{t('Language')}</Typography>
                <LanguageToggle />

                <Typography gutterBottom>{t('Dark')}</Typography>
                <DarkModeToggle />
            </Stack>
        </Box>
    )
}
