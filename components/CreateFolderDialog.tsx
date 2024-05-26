"use client";
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface dialogProps {
  open: boolean,
  handleClose: Function
};

export default function AlertDialog({ open, handleClose }: dialogProps) {
  const router = useRouter();
  const [folderName, setFolderName] = useState("")

  const apiFolderCreationRequest = async () => {
    const res = await fetch("/api/folder", {
      method: "POST",
      body: JSON.stringify({ name: folderName }),
    })
    console.log(res)
  }
  const createFolder = async () => {
    await apiFolderCreationRequest();
    handleClose();
  }
  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Add folder name"}
      </DialogTitle>
      <DialogContent>
        <TextField id="standard-basic" label="Standard" variant="standard" className='tw-w-96'
          value={folderName} onChange={(e) => setFolderName(e.target.value)} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Cancel</Button>
        <Button onClick={() => {
          createFolder()
        }} autoFocus>Create</Button>
      </DialogActions>
    </Dialog>
  );
}
