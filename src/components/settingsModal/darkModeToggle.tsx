import { DarkMode, LightMode } from '@mui/icons-material'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setDarkMode } from '../../store/features/appSlice'
import { useAppSelector } from '../../store'

export default function DarkModeToggle() {
    const isDarkMode = useAppSelector((state) => state.appState.isDarkMode)
    const dispatch = useDispatch()

    function handleDarkModeChange(
        event: React.MouseEvent<HTMLElement>,
        bool: boolean
    ) {
        dispatch(setDarkMode(bool))
    }

    return (
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
    )
}
