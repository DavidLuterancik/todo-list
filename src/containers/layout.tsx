import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Typography, Container } from '@mui/material'
import Nav from '../components/navigation/nav'
import SnackbarComponent from '../components/snackbar/snackbar'

function Layout() {
    return (
        <Box sx={{ minHeight: '100vh', mb: 8 }}>
            <SnackbarComponent />

            <Typography
                variant="h1"
                align="center"
                color="grey.700"
                fontWeight={600}
                sx={{
                    backgroundcolor: 'primary',
                    backgroundImage: `linear-gradient(45deg, #5514B4, #FF80FF)`,
                    backgroundSize: '100%',
                    backgroundRepeat: 'repeat',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    paddingY: 4,
                    fontSize: {
                        md: 96,
                        sm: 80,
                        xs: 64
                      }
                }}
            >
                {'TODO-IST'}
            </Typography>

            <Nav />

            <Container maxWidth="lg">
                <Outlet />
            </Container>
        </Box>
    )
}

export default Layout
