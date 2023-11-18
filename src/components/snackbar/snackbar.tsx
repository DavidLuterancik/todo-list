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
                <Alert severity="error" variant='filled'>
                    {text || 'Oops, something went wrong!'}
                </Alert>
            )
        } else if (type === 'success') {
            return <Alert severity="success" variant='filled'>{text || 'Success!'}</Alert>
        } else if (type === 'info') {
            return <Alert severity="info" variant='filled'>{text || 'Info!'}</Alert>
        } else {
            return <></>
        }
    }

    return (
        <Snackbar
            open={show}
            autoHideDuration={2000}
            onClick={() => dispatch(setShowSnackbar({ show: false }))}
        >
            <div>{getAlert()}</div>
        </Snackbar>
    )
}
