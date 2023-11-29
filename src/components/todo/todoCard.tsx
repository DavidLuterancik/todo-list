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
    useTheme,
} from '@mui/material'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { CalendarIcon } from '@mui/x-date-pickers'
import { blue } from '@mui/material/colors'
import { getDeadlineColor, isAfterDeadline } from '../../utils'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useMemo } from 'react'

const DATE_FORMAT = import.meta.env.VITE_DATE_FORMAT
const NUM_OF_ENTRIES = import.meta.env.VITE_NUM_OF_ENTRIES_ON_CARD

export default function ToDo({ todo }: TodoProps) {
    const [showAll, setShowAll] = useState(false)

    const items = useMemo(() => {
        if (showAll) {
            return todo?.items
        } else {
            return todo?.items?.slice(0, NUM_OF_ENTRIES)
        }
    }, [showAll, todo?.items])

    return (
        <Paper
            sx={{
                p: 2,
                mb: 2,
                '&:hover': {
                    // '& h6': {
                    //     color: blue[600],
                    // },
                },
            }}
        >
            <Link to={`/todo/${todo?.id}`}>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                        '&:hover': {
                            color: blue[600],
                        },
                    }}
                >
                    {todo.title}
                </Typography>
            </Link>

            <Divider orientation="horizontal" flexItem />

            <List dense>
                {items.map((item: TodoItem) => (
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
                                        wordWrap: 'break-word',
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

                <ShowMore
                    length={todo?.items?.length}
                    showAll={showAll}
                    setShowAll={() => setShowAll(true)}
                />
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
    )
}

const ShowMore = ({
    length,
    showAll,
    setShowAll,
}: {
    length: number
    showAll: boolean
    setShowAll: () => void
}) => {
    const { t } = useTranslation()
    const theme = useTheme()

    const hiddenItems = length - NUM_OF_ENTRIES
    if (!showAll && hiddenItems > 0) {
        return (
            <ListItem
                key={'more'}
                onClick={setShowAll}
                sx={{
                    cursor: 'pointer',
                    color: theme.palette.text.secondary,
                    '&:hover': {
                        color: theme.palette.text.primary,
                    },
                }}
                disablePadding
            >
                <ListItemText
                    primary={
                        <Typography
                            variant="body2"
                            fontWeight={'bold'}
                            sx={{
                                m: 1,
                            }}
                        >{`+ ${hiddenItems} ${t('more')} ...`}</Typography>
                    }
                />
            </ListItem>
        )
    }
}
