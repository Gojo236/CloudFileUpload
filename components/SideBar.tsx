"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { Button, makeStyles, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AlertDialog from './CreateFolderDialog';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const drawerWidth = 260;

const sideBarActions = ['Home', 'My Files', 'Trash', 'Starred'];

export default function SideBar() {
  const search = useSearchParams()
  
  
  const [selectedIndex, setSelectedIndex] = useState(1);
  const queryClient = useQueryClient()
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const handleClose = () => {
    setOpen(false);
  };
  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const folderId = search.get("folderId")
    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files[0])
      const body = new FormData();
      body.append("file", e.target.files[0]);
      (folderId && body.append("parentFolder", folderId));
      try {
        const response = await fetch("/api/file", {
          method: "POST",
          body: body,
        });

        if (response.ok) {
          const result = await response.json();
          console.log('File uploaded successfully:', result);
          alert("File Uploaded Successfully");
          router.refresh();
        } else {
          console.error('Error uploading file:', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  }
  const mutation = useMutation({
    mutationFn: handleFileInput,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['foldersFiles'] })
    },
  })


  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List className='tw-m-2 tw-p-2'>
          <ListItem className='tw-m-2'>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              fullWidth
            >
              Upload file
              <VisuallyHiddenInput type="file" onChange={mutation.mutate} />
            </Button>
          </ListItem>
          <ListItem className='tw-m-2'>
            <Button
              component="label"
              role={undefined}
              variant="outlined"
              tabIndex={-1}
              fullWidth
              startIcon={<CloudUploadIcon />}
              onClick={() => setOpen(true)}
            >
              Create Folder
            </Button>
          </ListItem>
        </List>
        <Divider />
        <List>
          {sideBarActions.map((text, index) => (
            <ListItem key={text} disablePadding onClick={() => setSelectedIndex(index)} className='tw-bg-red tw-red'>
              <ListItemButton selected={selectedIndex == index} className='tw-bg-red'>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <AlertDialog open={open} handleClose={handleClose} />
    </Box>
  );
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});