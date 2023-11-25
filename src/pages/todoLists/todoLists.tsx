import React from 'react'
import { Sorter } from '../../types/types'
import { Link } from 'react-router-dom'
import {
    Button,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from '@mui/material'
import { useToDoLists } from './todoLists.hooks.ts'
import { Add, Close } from '@mui/icons-material'
import ToDoGrid from '../../components/todoGrid/todoGrid.tsx'

function ToDoLists() {
    const { setSearch, search, setSorter, sorter, todos, error, isFetching } =
        useToDoLists()

    return (
        <>
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={2}
                sx={{
                    mb: 4,
                }}
            >
                <Stack
                    spacing={2}
                    direction={{ xs: 'column', sm: 'row' }}
                    flex={1}
                >
                    <TextField
                        id="search"
                        label="Search"
                        value={search}
                        onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                        ) => {
                            setSearch(event.target.value)
                        }}
                        fullWidth
                        InputProps={{
                            endAdornment: search !== '' && (
                                <IconButton
                                    onClick={() => {
                                        setSearch('')
                                    }}
                                >
                                    <Close />
                                </IconButton>
                            ),
                        }}
                    />

                    <FormControl fullWidth>
                        <InputLabel id="sorter-select-label">Sorter</InputLabel>
                        <Select
                            labelId="sorter-select-label"
                            id="sorter-select"
                            value={sorter}
                            label="Sorter"
                            onChange={(e) =>
                                setSorter(e.target.value as Sorter)
                            }
                        >
                            {Object.values(Sorter).map((sorter) => (
                                <MenuItem key={sorter} value={sorter}>
                                    {sorter}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>

                <Divider
                    orientation="vertical"
                    flexItem
                    sx={{ display: { xs: 'none', md: 'block' } }}
                />

                <Button
                    variant="contained"
                    sx={{
                        xs: {
                            minWidth: 256,
                        },
                    }}
                    endIcon={<Add />}
                    to={`/todo/new`}
                    component={Link}
                >
                    Create
                </Button>
            </Stack>

            <ToDoGrid
                error={error ? true : false}
                isFetching={isFetching}
                todos={todos || []}
            />
        </>
    )
}

export default ToDoLists
