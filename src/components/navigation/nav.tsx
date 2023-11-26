import { Checklist, Info, Settings } from '@mui/icons-material'
import { Modal, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import SettingsModal from '../settingsModal/settingsModal'
import { useTranslation } from 'react-i18next'

const MENU_ITEMS = [
    {
        path: '/',
        label: 'Todo_Lists',
        icon: <Checklist />,
    },
    {
        path: '/about',
        label: 'About',
        icon: <Info />,
    },
]

export default function Nav() {
    const { t } = useTranslation()
    const { pathname } = useLocation()

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const theme = useTheme();
    const show = useMediaQuery(theme.breakpoints.up('sm'));

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <SettingsModal />
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
                        label={show && t(menuItem.label)}
                        component={Link}
                        icon={menuItem.icon}
                        iconPosition="start"
                    />
                ))}
                <Tab
                    key={'settings'}
                    value={'settings'}
                    onClick={handleOpen}
                    label={show && t('Settings')}
                    icon={<Settings />}
                    iconPosition="start"
                />
            </Tabs>
        </>
    )
}
