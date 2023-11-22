import {
    Container,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemText,
    Typography,
} from '@mui/material'
import React from 'react'

const TECH = [
    'Material-UI',
    'Moment',
    'React',
    'React Hook Form',
    'React Router',
    'Redux Toolkit',
    'Tailwind',
    'TypeScript',
    'Vite',
    'Zod',
]

export default function About() {
    return (
        <Container maxWidth="sm" disableGutters>
            <Typography variant="h4" gutterBottom textAlign={'center'}>
                Welcome! 🙋‍♂️
            </Typography>
            <Typography
                variant="body1"
                paragraph
                textAlign={'center'}
                sx={{
                    marginBottom: 4,
                }}
            >
                This is a sample application for ToDo lists.
            </Typography>

            <Grid
                container
                sx={{
                    marginBottom: 4,
                }}
            >
                <Grid item xs>
                    <List dense disablePadding>
                        <ListItem disablePadding>
                            <ListItemText
                                sx={{ mr: 4 }}
                                primary="Create and Manage"
                                secondary="Multiple ToDo lists to keep track of the tasks."
                            />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText
                                sx={{ mr: 4 }}
                                primary="Keep track"
                                secondary="Each ToDo list has a title, date, and a set of items with name, deadline and completion."
                            />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText
                                sx={{ mr: 4 }}
                                primary="Persist"
                                secondary="Store your data on external API to keep track wherever you are."
                            />
                        </ListItem>
                    </List>
                </Grid>

                <Divider orientation="vertical" flexItem />

                <Grid item xs>
                    <List dense disablePadding>
                        {TECH.map((t) => {
                            return (
                                <ListItem
                                    sx={{ textAlign: 'right', padding: 0 }}
                                >
                                    <ListItemText primary={t} />
                                </ListItem>
                            )
                        })}
                    </List>
                </Grid>
            </Grid>

            <Typography
                variant="h5"
                textAlign={'center'}
                color={'textSecondary'}
            >
                Happy task management!
            </Typography>
        </Container>
    )
}
