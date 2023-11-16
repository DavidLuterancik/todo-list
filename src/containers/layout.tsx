import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Tabs, Tab, Box, Typography, Container } from '@mui/material'

const MENU_ITEMS = [
    { path: '/', label: 'Home' },
    { path: '/todos', label: 'Todo Lists' },
    { path: '/about', label: 'About' },
]

function Layout() {
    const { pathname } = useLocation()

    return (
        <Box sx={{ minHeight: '100vh' }}>
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
                }}
            >
                {'TODO-IST'}
            </Typography>

            <Tabs
                sx={{
                    borderBottom: 1,
                    borderColor: 'divider',
                    marginBottom: 4,
                }}
                centered
                value={pathname}
            >
                {MENU_ITEMS.map((menuItem) => (
                    <Tab
                        key={menuItem.path}
                        value={menuItem.path}
                        to={menuItem.path}
                        label={menuItem.label}
                        component={Link}
                    />
                ))}
            </Tabs>

            <Container maxWidth="lg">
                <Outlet />
            </Container>
        </Box>
    )
}

export default Layout
