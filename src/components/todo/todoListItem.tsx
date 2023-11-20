import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { ItemStatus, TodoListItemProps } from '../../types/types'
import {
    Checkbox,
    IconButton,
    ListItem,
    ListItemIcon,
    TextField,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import moment from 'moment'
import { DeleteOutline } from '@mui/icons-material'
import { ContentCopyOutlined } from '@mui/icons-material'
import { DragIndicator } from '@mui/icons-material'

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

    return (
        <ListItem
            dense
            key={`${index}${item.id}`}
            alignItems="flex-start"
            sx={{
                display: !shouldRenderItem(
                    watch(`items.${index}.checked`, null),
                    itemStatus
                )
                    ? 'none'
                    : 'flex',
            }}
        >
            <ListItemIcon>
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
            </ListItemIcon>

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
                        helperText={error && error.message}
                        error={!!error}
                        onChange={onChange}
                        value={value}
                        sx={{
                            width: '50%',
                            mr: 1,
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
                            width: '50%',
                        }}
                        slotProps={{
                            textField: {
                                clearable: true,
                                onBlur,
                                name,
                                error: !!fieldState?.error,
                                helperText: fieldState?.error?.message,
                            },
                        }}
                    />
                )}
            />
            <ListItemIcon
                sx={{
                    justifyContent: 'flex-end',
                    ml: 1,
                }}
            >
                <IconButton onClick={() => append(item)}>
                    <ContentCopyOutlined />
                </IconButton>

                <IconButton onClick={() => remove(index)}>
                    <DeleteOutline />
                </IconButton>
            </ListItemIcon>
        </ListItem>
    )
}
