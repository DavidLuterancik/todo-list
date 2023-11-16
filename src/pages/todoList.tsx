import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useGetTodoQuery } from '../store/services/toDoLists'
import {
    Button,
    Checkbox,
    FormControl,
    IconButton,
    InputLabel,
    List,
    ListItem,
    MenuItem,
    Select,
    TextField,
} from '@mui/material'
import { ItemStatus, TodoItem } from '../types/types'
import { useEffect } from 'react'
import { useMemo } from 'react'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { Delete } from '@mui/icons-material'
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

function filterItemsByStatus(items, itemStatus) {
    switch (itemStatus) {
        case ItemStatus.All:
            return items // Return all items
        case ItemStatus.Active:
            return items.filter((item) => !item.checked) // Return items with checked set to false
        case ItemStatus.Completed:
            return items.filter((item) => item.checked) // Return items with checked set to true
    }
}

function initItem() {
    return {
        name: '',
        checked: false,
        deadline: null,
    }
}

function ToDoList() {
    const { id } = useParams()

    const [itemStatus, setItemStatus] = useState<ItemStatus>(ItemStatus.All)

    const { data: todo, error, isFetching } = useGetTodoQuery(id)
    const items = useMemo(() => todo?.items || [], [todo])

    const [localTodoItems, setLocalTodoItems] = useState<TodoItem[]>([])

    const filteredTodoItems = useMemo(
        () => filterItemsByStatus(localTodoItems, itemStatus),
        [localTodoItems, itemStatus]
    )

    const [addItem, setAddItem] = useState<TodoItem>(initItem())

    useEffect(() => {
        setLocalTodoItems(items)
    }, [items])

    const methods = useForm<TodoItem>({
        defaultValues: initItem(),
        resolver: zodResolver(ItemSchema),
        mode: 'all',
    })

    const {
        control,
        handleSubmit,
        formState: { isValid, isSubmitted, isSubmitting, errors },
    } = methods

    console.log(errors, isValid, isSubmitted, isSubmitting)

    const onSubmit: SubmitHandler<TodoItem> = (data) => {
        console.log('isValid', isValid)
        console.log('formData', data)
    }

    function handleCheckboxChange(index: number) {
        setLocalTodoItems((prevItems) => {
            const updatedTodoItems = [...prevItems]
            updatedTodoItems[index] = {
                ...updatedTodoItems[index],
                checked: !updatedTodoItems[index].checked,
            }
            return updatedTodoItems
        })
    }

    function handleInputChange(
        index: number,
        propertyName: string,
        value: unknown
    ) {
        setLocalTodoItems((prevItems) => {
            const updatedTodoItems = [...prevItems]
            updatedTodoItems[index] = {
                ...updatedTodoItems[index],
                [propertyName]: value,
            }
            return updatedTodoItems
        })
    }

    function handleAddItem() {
        setLocalTodoItems((prevItems) => {
            const updatedTodoItems = [...prevItems]
            updatedTodoItems.push(addItem)
            setAddItem(initItem())
            return updatedTodoItems
        })
    }

    function handleDeleteItem(removeIndex: number) {
        setLocalTodoItems((prevItems) => {
            const updatedTodoItems = [...prevItems]
            updatedTodoItems.splice(removeIndex, 1)
            return updatedTodoItems
        })
    }

    if (isFetching) {
        return <>Loading</>
    }

    return (
        <div>
            <Link to={`/todos`}>
                <Button>Back</Button>
            </Link>

            <FormControl fullWidth>
                <InputLabel id="category-select-label">Item status</InputLabel>
                <Select
                    labelId="category-select-label"
                    id="category-select"
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

            <p>Current ID: {id}</p>
            <h2>Title: {todo?.title}</h2>

            <List>
                {filteredTodoItems.map((item: TodoItem, index: number) => (
                    <ListItem key={index}>
                        <Checkbox
                            checked={item.checked}
                            onChange={() => handleCheckboxChange(index)}
                            disabled
                        />

                        <TextField
                            label="Name"
                            value={item.name}
                            onChange={(e) =>
                                handleInputChange(index, 'name', e.target.value)
                            }
                            disabled
                        />

                        <LocalizationProvider dateAdapter={AdapterMoment}>
                            <DatePicker
                                disabled
                                label="Deadline"
                                value={item.deadline && moment(item.deadline)}
                                onChange={(newValue) =>
                                    handleInputChange(
                                        index,
                                        'deadline',
                                        moment(newValue).toISOString()
                                    )
                                }
                            />
                        </LocalizationProvider>

                        <IconButton onClick={() => handleDeleteItem(index)}>
                            <Delete />
                        </IconButton>
                    </ListItem>
                ))}
            </List>

            <div>New Item</div>

            <FormProvider {...methods}>
                <form>
                    <Controller
                        name={'checked'}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Checkbox checked={value} onChange={onChange} />
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
                            />
                        )}
                    />

                    <Controller
                        name={'deadline'}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DatePicker
                                    label="Deadline"
                                    value={value && moment(value)}
                                    onChange={onChange}
                                />
                            </LocalizationProvider>
                        )}
                    />

                    <Button onClick={handleSubmit(onSubmit)}>Add item</Button>
                </form>
            </FormProvider>

            <Button onClick={() => console.log(localTodoItems)}>
                Save list
            </Button>
        </div>
    )
}

export default ToDoList
