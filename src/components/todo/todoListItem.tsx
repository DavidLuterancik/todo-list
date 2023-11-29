import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { ItemStatus, TodoListItemProps } from '../../types/types'
import {
    Checkbox,
    IconButton,
    ListItem,
    Stack,
    TextField,
    Tooltip,
    useTheme,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import { DeleteOutline } from '@mui/icons-material'
import { ContentCopyOutlined } from '@mui/icons-material'
import { DragIndicator } from '@mui/icons-material'
import {
    MAX_NAME_LENGHT,
    MIN_NAME_LENGHT,
    getDeadlineColor,
    getMaxLenght,
    isAfterDeadline,
} from '../../utils'
import { useTranslation } from 'react-i18next'

function shouldRenderItem(checked, itemStatus) {
    if (!checked && itemStatus === ItemStatus.Active) {
        return true
    } else if (checked && itemStatus === ItemStatus.Completed) {
        return true
    } else if (itemStatus === ItemStatus.All) {
        return true
    }

    return false
}

export default function TodoListItem({
    item,
    index,
    itemStatus,
    remove,
    append,
}: TodoListItemProps) {
    const { t } = useTranslation()
    const theme = useTheme()

    const { watch, control } = useFormContext()

    const watchedChecked = watch(`items.${index}.checked`)
    const watchedDeadline = watch(`items.${index}.deadline`)

    const itemStyle = {
        display: !shouldRenderItem(watchedChecked, itemStatus)
            ? 'none'
            : 'flex',
        backgroundColor: index % 2 ? theme.palette.divider : 'transparent',
        borderRadius: 2,
        py: { xs: 4, sm: 1 },
        my: { xs: 1, sm: 1 },
        border: 1,
        borderColor: theme.palette.divider,
    }

    return (
        <ListItem disableGutters key={`${index}${item.id}`} sx={itemStyle}>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent={'space-between'}
                spacing={{ xs: 4, sm: 0 }}
                sx={{
                    pr: { xs: 0, sm: 2 },
                }}
            >
                <IconButton disabled>
                    <DragIndicator />
                </IconButton>

                <Controller
                    name={`items.${index}.checked`}
                    control={control}
                    defaultValue={false}
                    render={({ field: { onChange, value } }) => (
                        <Checkbox
                            key={`${item.id}.checked`}
                            checked={value}
                            onChange={onChange}
                        />
                    )}
                />
            </Stack>

            <Stack
                spacing={1}
                direction={{ xs: 'column', sm: 'row' }}
                flexGrow={1}
            >
                <Controller
                    name={`items.${index}.name`}
                    control={control}
                    render={({
                        field: { onChange, value },
                        fieldState: { error },
                    }) => (
                        <TextField
                            required
                            key={`${item.id}.name`}
                            label={t('Name')}
                            helperText={
                                error
                                    ? `${t('Name')} ${t(error?.message || '', {
                                          length: MIN_NAME_LENGHT,
                                      })}`
                                    : getMaxLenght(
                                          value.length,
                                          MAX_NAME_LENGHT
                                      )
                            }
                            error={!!error}
                            onChange={onChange}
                            value={value}
                            multiline
                            minRows={1}
                            maxRows={4}
                            sx={{
                                width: '100%',
                                label: {
                                    textDecoration: watchedChecked
                                        ? 'line-through'
                                        : 'none',
                                },
                            }}
                        />
                    )}
                />

                <Controller
                    name={`items.${index}.deadline`}
                    control={control}
                    render={({
                        field: { onChange, onBlur, name, value },
                        fieldState,
                    }) => (
                        <DatePicker
                            key={`${item.id}.deadline`}
                            label={t('Deadline')}
                            value={value && moment(value)}
                            onChange={onChange}
                            sx={{
                                label: {
                                    color: getDeadlineColor(
                                        watchedChecked,
                                        watchedDeadline
                                    ),
                                    fontWeight: isAfterDeadline(
                                        watchedChecked,
                                        watchedDeadline
                                    )
                                        ? 'bold'
                                        : 'normal',
                                },

                                width: '100%',
                            }}
                            slotProps={{
                                textField: {
                                    onBlur,
                                    name,
                                    error: !!fieldState?.error,
                                    helperText: t(
                                        fieldState?.error?.message || ''
                                    ),
                                },
                            }}
                        />
                    )}
                />
            </Stack>

            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent={'space-between'}
                spacing={{ xs: 4, sm: 0 }}
                sx={{
                    pl: { xs: 0, sm: 2 },
                }}
            >
                <Tooltip title={t('Duplicate')}>
                    <IconButton onClick={() => append(item)}>
                        <ContentCopyOutlined />
                    </IconButton>
                </Tooltip>

                <Tooltip title={t('Remove')}>
                    <IconButton onClick={() => remove(index)}>
                        <DeleteOutline />
                    </IconButton>
                </Tooltip>
            </Stack>
        </ListItem>
    )
}
