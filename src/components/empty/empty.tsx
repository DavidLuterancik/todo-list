import { Typography } from '@mui/material'
import React from 'react'

export default function Empty() {
    return (
        <Typography variant="body2" color={'textSecondary'}>
            {'Empty - change the filter or add more items'}
        </Typography>
    )
}
