import React, { useState } from 'react'
import {
    Button,
    Checkbox,
    Container,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    List,
    ListItem,
    ListItemIcon,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { ItemStatus, ToDoFormProps, Todo } from '../../types/types'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { Add, Delete, DeleteOutline, Save } from '@mui/icons-material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import { TodoSchema } from '../../schemas/itemSchema'
import {
    Controller,
    FieldArrayWithId,
    FormProvider,
    useFieldArray,
    useForm,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Empty from '../../components/empty/empty'
import { Edit } from '@mui/icons-material'
import { v4 as uuidv4 } from 'uuid'
import { unstable_usePrompt } from 'react-router-dom'
import BackButton from '../backButton/backButton'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const DATE_FORMAT = import.meta.env.VITE_DATE_FORMAT

function initItem() {
    return {
        id: uuidv4(),
        name: '',
        checked: false,
        deadline: null,
    }
}

function getDefaultData(todo: Todo | undefined) {
    return {
        id: todo?.id || undefined,
        title: todo?.title || '',
        items: todo?.items || [],
        date: moment(todo?.date).toISOString(),
    }
}

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

export default function ToDoForm({
    isEdit,
    todo,
    onSubmitEdit,
    onSubmitSave,
    onSubmitDelete,
}: ToDoFormProps) {
    const [itemStatus, setItemStatus] = useState<ItemStatus>(ItemStatus.All)

    const methods = useForm<Todo>({
        defaultValues: getDefaultData(todo),
        resolver: zodResolver(TodoSchema),
        mode: 'all',
    })
    const { control, handleSubmit, watch, formState } = methods
    // const { isDirty, isSubmitted } = formState
    const { fields, append, remove, move } = useFieldArray({
        control,
        name: 'items',
    })

    // unstable_usePrompt({
    //     message: 'You have unsaved changes, do you want to leave?',
    //     when: isDirty && !isSubmitted,
    // })

    return (
        <Container maxWidth="lg">
            <LocalizationProvider
                dateAdapter={AdapterMoment}
                adapterLocale="sk-SK"
            >
                <FormProvider {...methods}>
                    <form>
                        <Paper
                            sx={{
                                p: 2,
                                pb: 4,
                                mb: 2,
                            }}
                        >
                            {renderHeader()}

                            <Stack direction={'column'} spacing={2}>
                                <Typography variant="h6">{`ToDo`}</Typography>
                                <Controller
                                    name={'title'}
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            key={'title'}
                                            label={'Title'}
                                            helperText={error && error.message}
                                            error={!!error}
                                            onChange={onChange}
                                            value={value}
                                            fullWidth
                                            required
                                        />
                                    )}
                                />

                                <Controller
                                    name={`date`}
                                    control={control}
                                    render={({
                                        field: {
                                            onChange,
                                            onBlur,
                                            name,
                                            value,
                                        },
                                        fieldState,
                                    }) => (
                                        <DatePicker
                                            key={`date`}
                                            label="Date"
                                            value={value && moment(value)}
                                            onChange={onChange}
                                            fullWidth
                                            format={DATE_FORMAT}
                                            slotProps={{
                                                textField: {
                                                    required: true,
                                                    clearable: true,
                                                    onBlur,
                                                    name,
                                                    error: !!fieldState?.error,
                                                    helperText:
                                                        fieldState?.error
                                                            ?.message,
                                                },
                                            }}
                                        />
                                    )}
                                />
                                <Typography variant="h6">{'Items'}</Typography>
                            </Stack>

                            {renderDraggableList()}

                            <Button
                                variant="outlined"
                                onClick={() => {
                                    append(initItem())
                                    setItemStatus(ItemStatus.All)
                                }}
                                endIcon={<Add />}
                                fullWidth
                            >
                                Add Item
                            </Button>
                        </Paper>

                        {renderActions()}
                    </form>
                </FormProvider>
            </LocalizationProvider>
            {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
        </Container>
    )

    function renderHeader() {
        return (
            <Stack
                direction="row"
                spacing={2}
                sx={{
                    mb: 2,
                }}
            >
                <BackButton />

                <Divider orientation="vertical" flexItem />

                <FormControl
                    sx={{
                        width: 128,
                    }}
                >
                    <InputLabel id="item-select-label">Item status</InputLabel>
                    <Select
                        labelId="item-select-label"
                        id="item-select"
                        value={itemStatus}
                        onChange={(e) =>
                            setItemStatus(e.target.value as ItemStatus)
                        }
                        style={{
                            background: 'white',
                        }}
                    >
                        {Object.values(ItemStatus).map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Stack>
        )
    }

    function renderDraggableList() {
        return (
            <List disablePadding sx={{ mb: 4 }}>
                <DragDropContext
                    onDragEnd={(result) => {
                        if (result.source && !!result.destination) {
                            if (
                                result.destination.index === result.source.index
                            ) {
                                return
                            }
                            move(result.source.index, result.destination.index)
                        }
                    }}
                >
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {fields.length === 0 && <Empty />}
                                {fields.map((item, index) => {
                                    return (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {renderListItem(
                                                        item,
                                                        index
                                                    )}
                                                </div>
                                            )}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                {/* {fields.map((item, index) => {
                    return (
                        <div>
                            <ListItem
                                dense
                                alignItems="flex-start"
                                key={`${index}${item.id}`}
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
                                    <Controller
                                        name={`items.${index}.checked`}
                                        control={control}
                                        defaultValue={false}
                                        render={({
                                            field: { onChange, value },
                                        }) => (
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
                                        field: {
                                            onChange,
                                            onBlur,
                                            name,
                                            value,
                                        },
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
                                                    helperText:
                                                        fieldState?.error
                                                            ?.message,
                                                },
                                            }}
                                        />
                                    )}
                                />
                                <ListItemIcon
                                    sx={{
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <IconButton
                                        edge={'end'}
                                        onClick={() => remove(index)}
                                    >
                                        <DeleteOutline />
                                    </IconButton>
                                </ListItemIcon>
                            </ListItem>
                        </div>
                    )
                })} */}
            </List>
        )
    }

    function renderListItem(
        item: FieldArrayWithId<Todo, 'items', 'id'>,
        index: number
    ) {
        return (
            <ListItem
                dense
                alignItems="flex-start"
                key={`${index}${item.id}`}
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
                    }}
                >
                    <IconButton edge={'end'} onClick={() => remove(index)}>
                        <DeleteOutline />
                    </IconButton>
                </ListItemIcon>
            </ListItem>
        )
    }

    function renderActions() {
        return (
            <Stack direction={'row'} spacing={2}>
                {isEdit ? (
                    <>
                        <Button
                            variant="contained"
                            size="large"
                            endIcon={<Edit />}
                            onClick={onSubmitEdit && handleSubmit(onSubmitEdit)}
                        >
                            {'Edit'}
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            endIcon={<Delete />}
                            onClick={onSubmitDelete && onSubmitDelete}
                        >
                            {'Delete'}
                        </Button>
                    </>
                ) : (
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<Save />}
                        onClick={onSubmitSave && handleSubmit(onSubmitSave)}
                        type="submit"
                    >
                        {'Save'}
                    </Button>
                )}
            </Stack>
        )
    }
}
