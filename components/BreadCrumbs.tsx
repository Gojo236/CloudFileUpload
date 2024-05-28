import { Breadcrumbs, Link, Typography } from '@mui/material'
import React from 'react'

function BreadCrumbs() {
    return (
        <Breadcrumbs aria-label="breadcrumb" style={{marginTop: "5px"}}>
            <Link underline="hover" color="inherit" href="/">
                MUI
            </Link>
            <Link
                underline="hover"
                color="inherit"
                href="/material-ui/getting-started/installation/"
            >
                Core
            </Link>
            <Typography color="text.primary">Breadcrumbs</Typography>
        </Breadcrumbs>
    )
}

export default BreadCrumbs