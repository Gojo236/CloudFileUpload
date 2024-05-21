import { Box, IconButton, InputBase, Paper, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

import React from 'react'
function SearchBar() {
    return (
        <Paper
            component="form"
            sx={{ display: 'flex', alignItems: 'center', width: "100%" }}
        >

            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}

export default SearchBar