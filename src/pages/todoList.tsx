import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import {
    useDeleteTodoMutation,
    useGetTodoQuery,
    usePostTodoMutation,
    usePutTodoMutation,
} from '../store/services/toDoLists'
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
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { ItemStatus, Todo, TodoItem } from '../types/types'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import {
    Add,
    ArrowBack,
    Delete,
    DeleteOutline,
    Save,
} from '@mui/icons-material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import { ItemSchema } from '../schemas/itemSchema'
import {
    Controller,
    FormProvider,
    SubmitHandler,
    useForm,
} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import ToDoSkeleton from '../components/todo/todo.skeleton'
import Empty from '../components/empty/empty'
import { useDispatch } from 'react-redux'
import { setShowSnackbar } from '../store/features/appSlice'
import { Edit } from '@mui/icons-material'
import { v4 as uuidv4 } from 'uuid';

function filterItemsByStatus(items, itemStatus) {
    switch (itemStatus) {
        case ItemStatus.All:
            return items
        case ItemStatus.Active:
            return items.filter((item) => !item.checked)
        case ItemStatus.Completed:
            return items.filter((item) => item.checked)
    }
}

function ToDoList() {
    const { id } = useParams()

    const [itemStatus, setItemStatus] = useState<ItemStatus>(ItemStatus.All)

    const { data: todo, error, isFetching } = useGetTodoQuery(id as string)
    const [title, setTitle] = useState('')

    const items = useMemo(() => todo?.items || [], [todo])
    const [localTodoItems, setLocalTodoItems] = useState<TodoItem[]>([])
    const filteredTodoItems = useMemo(
        () => filterItemsByStatus(localTodoItems, itemStatus),
        [localTodoItems, itemStatus]
    )

    const [, setAddItem] = useState<TodoItem>(initItem())

    function initItem() {
        return {
            id: '',
            name: '',
            checked: false,
            deadline: null,
        }
    }

    useEffect(() => {
        setLocalTodoItems(items)
    }, [items])

    useEffect(() => {
        setTitle(todo?.title || '')
    }, [todo])

    const methods = useForm<TodoItem>({
        defaultValues: initItem(),
        resolver: zodResolver(ItemSchema),
        mode: 'all',
    })

    const {
        control,
        handleSubmit,
        // formState: { isValid, isSubmitted, isSubmitting, errors },
        reset,
        // watch,
    } = methods

    const onSubmit: SubmitHandler<TodoItem> = (data) => {
        handleAddItem(data)
        reset()
    }

    function handleAddItem(data) {
        setLocalTodoItems((prevItems) => {
            const updatedTodoItems = [...prevItems]

            updatedTodoItems.push(Object.assign(data, {id: uuidv4()}))

            setAddItem(initItem())
            return updatedTodoItems
        })
    }

    function handleCheckboxChange(itemId: string) {
        setLocalTodoItems((prevItems) => {
            const updatedTodoItems = prevItems.map((item) =>
                item.id === itemId ? { ...item, checked: !item.checked } : item
            )
            return updatedTodoItems
        })
    }

    function handleInputChange(
        itemId: string,
        propertyName: string,
        value: unknown
    ) {
        setLocalTodoItems((prevItems) => {
            const updatedTodoItems = prevItems.map((item) =>
                item.id === itemId ? { ...item, [propertyName]: value } : item
            )
            return updatedTodoItems
        })
    }

    function handleDeleteItem(itemId: string) {
        setLocalTodoItems((prevItems) => {
            const updatedTodoItems = prevItems.filter(
                (item) => item.id !== itemId
            )
            return updatedTodoItems
        })
    }

    const [putTodo] = usePutTodoMutation()
    const [postTodo] = usePostTodoMutation()
    const [deleteTodo] = useDeleteTodoMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function handleEdit() {
        const body = {
            id: todo?.id,
            title,
            date: moment().toISOString(),
            items: localTodoItems,
        }

        putTodo(body)
            .unwrap()
            .then(() => {
                dispatch(
                    setShowSnackbar({
                        show: true,
                        type: 'success',
                        text: `Edited ToDo: ${todo?.title}`,
                    })
                )
            })
            .catch(() =>
                dispatch(
                    setShowSnackbar({
                        show: true,
                        type: 'error',
                    })
                )
            )
    }

    function handleSave() {
        const body = {
            id: todo?.id,
            title,
            date: moment().toISOString(),
            items: localTodoItems,
        }

        postTodo(body)
            .unwrap()
            .then((todo: Todo) => {
                dispatch(
                    setShowSnackbar({
                        show: true,
                        type: 'success',
                        text: `Created new ToDo: ${todo?.title}`,
                    })
                )
                navigate(`/todos`)
            })
            .catch(() =>
                dispatch(
                    setShowSnackbar({
                        show: true,
                        type: 'error',
                    })
                )
            )
    }

    function handleDelete() {
        deleteTodo(id)
            .unwrap()
            .then(() => {
                dispatch(
                    setShowSnackbar({
                        show: true,
                        type: 'info',
                        text: `Deleted ToDo: ${todo?.title}`,
                    })
                )
            })
            .catch(() =>
                dispatch(
                    setShowSnackbar({
                        show: true,
                        type: 'error',
                    })
                )
            )
        navigate('/todos')
    }

    if (isFetching) {
        return (
            <Container maxWidth="sm">
                <ToDoSkeleton />
            </Container>
        )
    }

    return (
        <Container maxWidth="sm">
            <Paper
                sx={{
                    p: 2,
                    pb: 4,
                    mb: 2,
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        mb: 4,
                    }}
                >
                    <Button
                        variant="outlined"
                        component={Link}
                        to={'/todos'}
                        startIcon={<ArrowBack />}
                    >
                        Back
                    </Button>

                    <Divider orientation="vertical" flexItem />

                    <FormControl
                        sx={{
                            width: 128,
                        }}
                    >
                        <InputLabel id="item-select-label">
                            Item status
                        </InputLabel>
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

                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    sx={{
                        mb: 2,
                    }}
                />

                <Typography variant="h6" gutterBottom>
                    {'Items'}
                </Typography>

                <List dense disablePadding>
                    {filteredTodoItems.length === 0 && <Empty />}

                    {filteredTodoItems.map((item: TodoItem, index: number) => (
                        <div className="relative">
                            <ListItem
                                disableGutters
                                className="relative z-10"
                                secondaryAction={
                                    <IconButton
                                        onClick={() =>
                                            handleDeleteItem(item.id)
                                        }
                                    >
                                        <DeleteOutline />
                                    </IconButton>
                                }
                            >
                                <Checkbox
                                    checked={item.checked}
                                    onChange={() =>
                                        handleCheckboxChange(item.id)
                                    }
                                />

                                <TextField
                                    label="Name"
                                    value={item.name}
                                    onChange={(e) =>
                                        handleInputChange(
                                            item.id,
                                            'name',
                                            e.target.value
                                        )
                                    }
                                    sx={{
                                        mr: 1,
                                    }}
                                />

                                <LocalizationProvider
                                    dateAdapter={AdapterMoment}
                                >
                                    <DatePicker
                                        label="Deadline"
                                        value={
                                            item.deadline &&
                                            moment(item.deadline)
                                        }
                                        onChange={(newValue) =>
                                            handleInputChange(
                                                item.id,
                                                'deadline',
                                                moment(newValue).toISOString()
                                            )
                                        }
                                    />
                                </LocalizationProvider>
                            </ListItem>

                            {item.checked && (
                                <div className="absolute h-px w-full top-1/2 bg-black bg-opacity-30" />
                            )}
                        </div>
                    ))}
                </List>
            </Paper>

            <Paper
                sx={{
                    p: 2,
                    mb: 2,
                }}
            >
                <FormProvider {...methods}>
                    <form>
                        <List dense disablePadding>
                            <ListItem disableGutters>
                                <Controller
                                    name={'checked'}
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                    }) => (
                                        <Checkbox
                                            checked={value}
                                            onChange={onChange}
                                        />
                                    )}
                                />

                                <Controller
                                    name={'name'}
                                    control={control}
                                    render={({
                                        field: { onChange, value },
                                        fieldState: { error },
                                    }) => (
                                        <TextField
                                            key={'new'}
                                            label={'Name'}
                                            helperText={error && error.message}
                                            error={!!error}
                                            onChange={onChange}
                                            value={value}
                                            sx={{
                                                mr: 1,
                                            }}
                                        />
                                    )}
                                />

                                <LocalizationProvider
                                    dateAdapter={AdapterMoment}
                                >
                                    <Controller
                                        name={'deadline'}
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
                                                key={'newDate'}
                                                label="Deadline"
                                                value={value && moment(value)}
                                                onChange={onChange}
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
                                </LocalizationProvider>
                            </ListItem>
                        </List>
                        <div className="flex justify-end mt-4">
                            <Button
                                variant="outlined"
                                onClick={handleSubmit(onSubmit)}
                                endIcon={<Add />}
                            >
                                Add Item
                            </Button>
                        </div>
                    </form>
                </FormProvider>
            </Paper>

            <Stack direction={'row'} spacing={2}>
                {todo?.id ? (
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<Edit />}
                        onClick={() => handleEdit()}
                    >
                        {'Edit'}
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        size="large"
                        endIcon={<Save />}
                        onClick={() => handleSave()}
                    >
                        {'Save'}
                    </Button>
                )}

                {todo?.id && (
                    <Button
                        variant="outlined"
                        size="large"
                        endIcon={<Delete />}
                        onClick={() => handleDelete()}
                    >
                        {'Delete'}
                    </Button>
                )}
            </Stack>
            {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
        </Container>
    )
}

export default ToDoList
