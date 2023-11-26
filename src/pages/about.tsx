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
import { useTranslation } from 'react-i18next'

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
    const { t } = useTranslation()

    return (
        <Container maxWidth="sm" disableGutters>
            <Typography variant="h4" gutterBottom textAlign={'center'}>
                {`${t('Welcome')}! 🙋‍♂️`}
            </Typography>
            <Typography
                variant="body1"
                paragraph
                textAlign={'center'}
                sx={{
                    marginBottom: 4,
                }}
            >
                {t('app_text')}
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
                                primary={t('create_and_manage')}
                                secondary={t('create_and_manage_desc')}
                            />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText
                                sx={{ mr: 4 }}
                                primary={t('keep_track')}
                                secondary={t('keep_track_desc')}
                            />
                        </ListItem>
                        <ListItem disablePadding>
                            <ListItemText
                                sx={{ mr: 4 }}
                                primary={t('persist')}
                                secondary={t('persist_desc')}
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
                {t('task_managmenet')}
            </Typography>
        </Container>
    )
}
