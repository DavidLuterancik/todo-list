import {
    Checklist,
    DarkMode,
    Info,
    LightMode,
    Settings,
} from '@mui/icons-material'
import {
    Box,
    Modal,
    Stack,
    Tab,
    Tabs,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { setDarkMode } from '../../store/features/appSlice'
import { useAppSelector } from '../../store'

const MENU_ITEMS = [
    {
        path: '/',
        label: 'Todo lists',
        icon: <Checklist />,
    },
    {
        path: '/about',
        label: 'About',
        icon: <Info />,
    },
]

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

export default function Nav() {
    const { pathname } = useLocation()

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [lang] = useState('EN')

    const isDarkMode = useAppSelector((state) => state.appState.isDarkMode)
    const dispatch = useDispatch()

    function handleDarkModeChange(
        event: React.MouseEvent<HTMLElement>,
        bool: boolean
    ) {
        dispatch(setDarkMode(bool))
    }

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography variant="h4" gutterBottom>
                        Settings
                    </Typography>

                    <Stack spacing={2}>
                        <Typography gutterBottom>Language</Typography>
                        <ToggleButtonGroup value={lang} exclusive fullWidth>
                            <ToggleButton value="EN">EN</ToggleButton>

                            <ToggleButton value="SK" disabled>
                                SK
                            </ToggleButton>

                            <ToggleButton value="CZ" disabled>
                                CZ
                            </ToggleButton>

                            <ToggleButton value="DE" disabled>
                                DE
                            </ToggleButton>
                        </ToggleButtonGroup>

                        <Typography gutterBottom>Dark</Typography>
                        <ToggleButtonGroup
                            onChange={handleDarkModeChange}
                            value={isDarkMode}
                            exclusive
                            fullWidth
                        >
                            <ToggleButton value={false}>
                                <LightMode />
                            </ToggleButton>

                            <ToggleButton value={true}>
                                <DarkMode />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>
                </Box>
            </Modal>

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
                        icon={menuItem.icon}
                        iconPosition="start"
                    />
                ))}
                <Tab
                    key={'settings'}
                    value={'settings'}
                    onClick={handleOpen}
                    label="Settings"
                    icon={<Settings />}
                    iconPosition="start"
                />
            </Tabs>
        </>
    )
}
