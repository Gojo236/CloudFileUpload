"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface dialogProps {
  open: boolean;
  handleClose: Function;
  placeholderText: string;
  handleSubmit: (name: string) => Promise<void>;
  defaultText?: string;
}

export default function AlertDialog({
  open,
  handleClose,
  handleSubmit,
  placeholderText,
  defaultText = "",
}: dialogProps) {
  const [folderName, setFolderName] = useState(defaultText);

  const useClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => handleSubmit(folderName),
    onSuccess: () => {
      useClient.invalidateQueries({ queryKey: ["foldersFiles"] });
    },
  });

  return (
    <Dialog
      open={open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{placeholderText}</DialogTitle>
      <DialogContent>
        <TextField
          id="standard-basic"
          label="Standard"
          variant="standard"
          className="tw-w-96"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose()}>Cancel</Button>
        <Button
          onClick={() => {
            mutation.mutate();
            handleClose();
          }}
          autoFocus
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
