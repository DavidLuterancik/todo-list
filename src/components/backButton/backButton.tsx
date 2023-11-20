import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function BackButton() {
    return (
        <Button
            variant="outlined"
            component={Link}
            to={'/'}
            startIcon={<ArrowBack />}
            sx={{
                mb: 4
            }}
        >
            Back
        </Button>
    )
}
