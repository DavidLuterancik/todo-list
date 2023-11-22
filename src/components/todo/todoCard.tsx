import React from 'react'
import { TodoItem, TodoProps } from '../../types/types'
import {
    Checkbox,
    Divider,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { CalendarIcon } from '@mui/x-date-pickers'
import { blue } from '@mui/material/colors'
import { getDeadlineColor, isAfterDeadline } from '../../utils'

const DATE_FORMAT = import.meta.env.VITE_DATE_FORMAT

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

                            <ListItemText
                                primary={
                                    <Typography
                                        variant="body1"
                                        color={
                                            item.checked
                                                ? 'textSecondary'
                                                : 'textPrimary'
                                        }
                                        sx={{
                                            fontWeight: 450,
                                            textDecoration: item.checked
                                                ? 'line-through'
                                                : 'none',
                                            width: '100%',
                                        }}
                                    >
                                        {item.name}
                                    </Typography>
                                }
                                secondary={
                                    item.deadline && (
                                        <Typography
                                            variant="body2"
                                            color={getDeadlineColor(
                                                item.checked,
                                                item.deadline
                                            )}
                                            sx={{
                                                textDecoration: item.checked
                                                    ? 'line-through'
                                                    : 'none',
                                                fontWeight: isAfterDeadline(
                                                    item.checked,
                                                    item.deadline
                                                )
                                                    ? 'bold'
                                                    : 'normal',
                                            }}
                                        >
                                            {moment(item.deadline).format(
                                                DATE_FORMAT
                                            )}
                                        </Typography>
                                    )
                                }
                            />
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
                        sx={{
                            marginRight: 1,
                        }}
                    />
                    {moment(todo.date).format(DATE_FORMAT)}
                </Typography>
            </Paper>
        </Link>
    )
}
