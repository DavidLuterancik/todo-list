import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../store'
import { setShowSnackbar } from '../../store/features/appSlice'

export default function SnackbarComponent() {
    const dispatch = useDispatch()
    const { show, type, text } = useAppSelector(
        (state) => state.appState.snackbar
    )

    function getAlert() {
        if (type === 'error') {
            return (
                <Alert severity="error" variant="filled">
                    {text}
                </Alert>
            )
        } else if (type === 'success') {
            return (
                <Alert severity="success" variant="filled">
                    {text}
                </Alert>
            )
        } else if (type === 'info') {
            return (
                <Alert severity="info" variant="filled">
                    {text}
                </Alert>
            )
        } else {
            return <></>
        }
    }

    function handleClose() {
        dispatch(setShowSnackbar({ show: false }))
    }

    return (
        <Snackbar
            open={show}
            autoHideDuration={2000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <div>{getAlert()}</div>
        </Snackbar>
    )
}
