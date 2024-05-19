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

const drawerWidth = 240;

const uploadOptions = [
  {
    text: 'Upload File',
    icon: AddIcon,
    style: {backgroundColor:"#61ad66", margin: 2, borderRadius: 10}
  }, 
  {
    text: 'Upload Folder',
    icon: AddIcon,
    style: {backgroundColor:"#34baeb", margin: 2, borderRadius: 10}
  }
];
const sideBarActions = ['Home', 'My Files','Trash', 'Starred'];
export default function SideBar() {
  const [selectedIndex, setSelectedIndex] = useState(1);

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
        <List>
          {uploadOptions.map((item, index) => (
            <ListItem key={item.text} style={item.style} disablePadding>
              <ListItemButton color='red'>
                <ListItemIcon color='red'>
                  <item.icon/>
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {sideBarActions.map((text, index) => (
            <ListItem key={text} disablePadding onClick={() => setSelectedIndex(index)} className='tw-bg-red tw-red'>
              <ListItemButton selected={selectedIndex == index} className='tw-bg-red'>
                {/* <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
