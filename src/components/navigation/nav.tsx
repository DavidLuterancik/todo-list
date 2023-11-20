import { Tab, Tabs } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const MENU_ITEMS = [
    { path: '/', label: 'Todo Lists' },
    { path: '/about', label: 'About' },
]

export default function Nav() {
    const { pathname } = useLocation()

    return (
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
    )
}
