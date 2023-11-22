import React from 'react'
import { Container, Typography } from '@mui/material'
import BackButton from './components/backButton/backButton'

function NotFoundPage() {
    return (
        <Container maxWidth="md">
            <BackButton to='/' />
            <Typography variant="h1" color="textSecondary">
                404
            </Typography>
            <Typography variant="h5" color="textSecondary">
                Nothing to see here 👀
            </Typography>
        </Container>
    )
}

export default NotFoundPage
