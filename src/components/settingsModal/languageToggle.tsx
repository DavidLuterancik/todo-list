import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../store'
import { setLang } from '../../store/features/appSlice'
import { useDispatch } from 'react-redux'
import { LANGS } from '../../i18n/config'


export default function LanguageToggle() {
    const lang = useAppSelector((state) => state.appState.lang)
    const dispatch = useDispatch()

    function handleLanguageChange(
        event: React.MouseEvent<HTMLElement>,
        locale: string
    ) {
        dispatch(setLang(locale))
    }

    return (
        <ToggleButtonGroup
            onChange={handleLanguageChange}
            value={lang}
            exclusive
            fullWidth
        >
            {LANGS.map((lang) => (
                <ToggleButton value={lang}>{lang}</ToggleButton>
            ))}
        </ToggleButtonGroup>
    )
}
