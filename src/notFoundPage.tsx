import React from 'react'
import { Container, Typography } from '@mui/material'
import BackButton from './components/backButton/backButton'
import { useTranslation } from 'react-i18next'

function NotFoundPage() {
    const { t } = useTranslation()

    return (
        <Container maxWidth="md">
            <BackButton to="/" />
            <Typography variant="h1" color="textSecondary">
                404
            </Typography>
            <Typography variant="h5" color="textSecondary">
                {`${t('nothing_text')} 👀`} 
            </Typography>
        </Container>
    )
}

export default NotFoundPage
