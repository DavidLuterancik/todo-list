import React, { useState } from 'react'
import {
    Button,
    Container,
    Divider,
    List,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { ItemStatus, ToDoFormProps, Todo } from '../../types/types'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { Add, Delete, Save } from '@mui/icons-material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import { TodoSchema } from '../../schemas/itemSchema'
import {
    Controller,
    FormProvider,
    useFieldArray,
    useForm,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Empty from '../../components/empty/empty'
import { Edit } from '@mui/icons-material'
import { v4 as uuidv4 } from 'uuid'
import { unstable_usePrompt } from 'react-router-dom'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import ActiveSelect from '../activeSelect/activeSelect'
import TodoListItem from './todoListItem'
import BackButton from '../backButton/backButton'
import { MAX_TITLE_LENGHT, getMaxLenght } from '../../utils'

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

const ToDoForm = ({
    isEdit,
    todo,
    onSubmitEdit,
    onSubmitSave,
    onSubmitDelete,
}: ToDoFormProps) => {
    const [itemStatus, setItemStatus] = useState<ItemStatus>(ItemStatus.All)

    const methods = useForm<Todo>({
        defaultValues: getDefaultData(todo),
        resolver: zodResolver(TodoSchema),
        mode: 'all',
    })
    const {
        control,
        handleSubmit,
        formState: { isDirty, isSubmitted },
    } = methods
    const { fields, append, remove, move } = useFieldArray({
        control,
        name: 'items',
    })

    unstable_usePrompt({
        message: 'You have unsaved changes, do you want to leave?',
        when: isDirty && !isSubmitted,
    })

    return (
        <Container maxWidth="lg" disableGutters>
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
                            {renderTodoInfo()}
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

                <ActiveSelect
                    value={itemStatus}
                    onChange={(e) =>
                        setItemStatus(e.target.value as ItemStatus)
                    }
                />
            </Stack>
        )
    }

    function renderTodoInfo() {
        return (
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
                            helperText={
                                error
                                    ? error.message
                                    : getMaxLenght(
                                          value.length,
                                          MAX_TITLE_LENGHT
                                      )
                            }
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
                        field: { onChange, onBlur, name, value },
                        fieldState,
                    }) => (
                        <DatePicker
                            key={`date`}
                            label="Date"
                            value={value && moment(value)}
                            onChange={onChange}
                            format={DATE_FORMAT}
                            slotProps={{
                                textField: {
                                    required: true,
                                    onBlur,
                                    name,
                                    error: !!fieldState?.error,
                                    helperText: fieldState?.error?.message,
                                },
                            }}
                        />
                    )}
                />
                <Typography variant="h6">{'Items'}</Typography>
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
                                                    <TodoListItem
                                                        item={item}
                                                        index={index}
                                                        itemStatus={itemStatus}
                                                        remove={remove}
                                                        append={append}
                                                    />
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
            </List>
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
                            fullWidth
                        >
                            {'Edit'}
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            color={'error'}
                            endIcon={<Delete />}
                            onClick={onSubmitDelete && onSubmitDelete}
                            fullWidth
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
                        fullWidth
                    >
                        {'Save'}
                    </Button>
                )}
            </Stack>
        )
    }
}

export default ToDoForm
