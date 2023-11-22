import { ArrowBack } from "@mui/icons-material";
import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function BackButton({to}: {to: string}) {
    return (
        <Button
            variant="outlined"
            size="large"
            component={Link}
            to={to}
            startIcon={<ArrowBack />}
            sx={{
                mb: 4
            }}
        >
            Back
        </Button>
    )
}
