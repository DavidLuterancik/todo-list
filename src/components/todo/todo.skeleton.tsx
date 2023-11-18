import React from 'react'
import { randomNumber } from '../../utils'
import {
    Checkbox,
    Divider,
    List,
    ListItem,
    Paper,
    Skeleton,
    Stack,
    Typography,
} from '@mui/material'

export default function ToDoSkeleton() {
    const lenght = randomNumber(1, 5)
    const itemArray = Array.from(Array(lenght).keys())

    return (
        <Paper
            sx={{
                p: 2,
                mb: 2,
            }}
        >
            <Typography variant="h6" gutterBottom>
                <Skeleton width={150} />
            </Typography>

            <Divider orientation="horizontal" flexItem />

            <List dense>
                {itemArray.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <Checkbox disabled size="small" />

                        <Stack
                            direction="row"
                            divider={
                                <Divider orientation="vertical" flexItem />
                            }
                            spacing={2}
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Skeleton animation="wave" width={100} />

                            <Skeleton animation="wave" width={80} />
                        </Stack>
                    </ListItem>
                ))}
            </List>

            <div className="flex justify-end">
                <Skeleton animation="wave" width={120} />
            </div>
        </Paper>
    )
}
