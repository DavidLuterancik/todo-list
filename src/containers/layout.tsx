import React from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Tabs, Tab, Box, Typography } from '@mui/material'

const MENU_ITEMS = [
    { path: '/', label: 'Home' },
    { path: '/todos', label: 'Todo Lists' },
]

function Layout() {
    const { pathname } = useLocation()

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Typography
                variant="h1"
                align="center"
                color="grey.700"
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
                TODO-IST
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
                        value={menuItem.path}
                        label={menuItem.label}
                        to={menuItem.path}
                        component={Link}
                    />
                ))}
            </Tabs>
            <Outlet />
        </Box>
    )
}

export default Layout
