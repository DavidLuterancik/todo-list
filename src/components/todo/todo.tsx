import React from 'react'
import { TodoItem, TodoProps } from '../../types/types'
import {
    Checkbox,
    Divider,
    List,
    ListItem,
    Paper,
    Stack,
    Typography,
} from '@mui/material'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { CalendarIcon } from '@mui/x-date-pickers'
import { blue } from '@mui/material/colors'

export default function ToDo({ todo }: TodoProps) {
    return (
        <Link to={`/todo/${todo?.id}`}>
            <Paper
                sx={{
                    p: 2,
                    mb: 2,
                    '&:hover': {
                        '& h6': {
                            color: blue[600],
                        },
                    },
                }}
            >
                <Typography variant="h6" gutterBottom>
                    {todo.title}
                </Typography>

                <Divider orientation="horizontal" flexItem />

                <List dense>
                    {todo?.items?.map((item: TodoItem) => (
                        <ListItem key={item.id} disablePadding>
                            <Checkbox
                                checked={item.checked}
                                disabled
                                size="small"
                            />

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
                                <Typography
                                    variant="body1"
                                    color={
                                        item.checked
                                            ? 'textSecondary'
                                            : 'textPrimary'
                                    }
                                    sx={{
                                        fontWeight: 'bold',
                                        textDecoration: item.checked
                                            ? 'line-through'
                                            : 'none',
                                    }}
                                >
                                    {item.name}
                                </Typography>

                                {item.deadline && (
                                    <Typography
                                        variant="body2"
                                        color={
                                            item.checked
                                                ? 'textSecondary'
                                                : 'textPrimary'
                                        }
                                        sx={{
                                            textDecoration: item.checked
                                                ? 'line-through'
                                                : 'none',
                                        }}
                                    >
                                        {moment(item.deadline).format(
                                            'DD/MM/YYYY'
                                        )}
                                    </Typography>
                                )}
                            </Stack>
                        </ListItem>
                    ))}
                </List>

                <Typography
                    variant="body2"
                    textAlign="right"
                    color={'textSecondary'}
                    gutterBottom
                >
                    <CalendarIcon
                        fontSize="14px"
                        sx={{
                            marginRight: 1,
                        }}
                    />
                    {moment(todo.date).format('DD/MM/YYYY')}
                </Typography>
            </Paper>
        </Link>
    )
}
