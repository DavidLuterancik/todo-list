import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { ActiveSelectProps, ItemStatus } from "../../types/types";


export default function ActiveSelect ({ value, onChange }: ActiveSelectProps) {
    return (
        <FormControl
            sx={{
                width: 128,
            }}
        >
            <InputLabel id="item-select-label">Item status</InputLabel>
            <Select
                labelId="item-select-label"
                id="item-select"
                value={value}
                onChange={onChange}
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
    );
}