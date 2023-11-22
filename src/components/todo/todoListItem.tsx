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
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import { DeleteOutline } from '@mui/icons-material'
import { ContentCopyOutlined } from '@mui/icons-material'
import { DragIndicator } from '@mui/icons-material'
import { grey } from '@mui/material/colors'
import {
    MAX_NAME_LENGHT,
    getDeadlineColor,
    getMaxLenght,
    isAfterDeadline,
} from '../../utils'

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
    const { watch, control } = useFormContext()

    const watchedChecked = watch(`items.${index}.checked`)
    const watchedDeadline = watch(`items.${index}.deadline`)

    return (
        <ListItem
            disableGutters
            key={`${index}${item.id}`}
            sx={{
                display: !shouldRenderItem(watchedChecked, itemStatus)
                    ? 'none'
                    : 'flex',
                backgroundColor: index % 2 ? grey[50] : 'white',
                borderRadius: 2,
                pt: 2,
            }}
        >
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
                            label={'Name'}
                            helperText={
                                error
                                    ? error.message
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
                                input: {
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
                            label="Deadline"
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
                                    helperText: fieldState?.error?.message,
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
                <Tooltip title="Duplicate">
                    <IconButton onClick={() => append(item)}>
                        <ContentCopyOutlined />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Remove">
                    <IconButton onClick={() => remove(index)}>
                        <DeleteOutline />
                    </IconButton>
                </Tooltip>
            </Stack>
        </ListItem>
    )
}
