"use client";
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { Button, makeStyles, styled } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AlertDialog from './CreateFolderDialog';

const drawerWidth = 240;

const uploadOptions = [
  {
    text: 'Upload File',
    icon: AddIcon,
    style: { backgroundColor: "#61ad66", margin: 2, borderRadius: 10 }
  },
  {
    text: 'Upload Folder',
    icon: AddIcon,
    style: { backgroundColor: "#34baeb", margin: 2, borderRadius: 10 }
  }
];
const sideBarActions = ['Home', 'My Files', 'Trash', 'Starred'];
export default function SideBar() {
  const [selectedIndex, setSelectedIndex] = useState(1);

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

  const [open, setOpen] = React.useState(false);


  const handleClose = () => {
    setOpen(false);
  };

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
              <VisuallyHiddenInput type="file" />
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
              onClick={()=> setOpen(true)}
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
      <AlertDialog open = {open} handleClose={handleClose}/>
    </Box>
  );
}
