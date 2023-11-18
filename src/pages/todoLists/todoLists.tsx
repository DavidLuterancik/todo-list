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
                direction="row"
                spacing={2}
                sx={{
                    mb: 4,
                }}
            >
                <TextField
                    id="search"
                    label="Search"
                    value={search}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setSearch(event.target.value)
                    }}
                    fullWidth
                    sx={{
                        background: 'white',
                    }}
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
                        onChange={(e) => setSorter(e.target.value as Sorter)}
                        sx={{
                            background: 'white',
                        }}
                    >
                        {Object.values(Sorter).map((sorter) => (
                            <MenuItem key={sorter} value={sorter}>
                                {sorter}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Divider orientation="vertical" flexItem />

                <Button
                    variant="contained"
                    sx={{
                        width: 256,
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
