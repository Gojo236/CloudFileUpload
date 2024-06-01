import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useMutation, useQueryClient } from '@tanstack/react-query';




const ITEM_HEIGHT = 48;

export default function KebabMenu({ isFile, id, parentFolderId }: { isFile: boolean, id: string, parentFolderId: string|null }) {
    const queryClient = useQueryClient()

    const renameFolder = async () =>{
        const response = await fetch(`/api/${isFile?"file":"folder"}/rename`,{
            method: "PUT",
            body: JSON.stringify({
                name: "Temp",
                id: id
            })
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result)
        return result
    }
    const renameFile =async()=>{
        
    }
    const nameUpdate = useMutation({
        mutationFn: (isFile ? renameFile: renameFolder),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['foldersFiles'] })
        },
      })

    const options = [
        {label: 'Rename', handleClick: nameUpdate.mutate},
        {label: 'Delete', handleClick: ()=>{}}
    ];


    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {options.map((option) => (
                    <MenuItem key={option.label} onClick={() => {option.handleClick()}}>
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}