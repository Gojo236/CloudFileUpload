"use client";
import React, { useEffect, useState } from 'react'
import FolderCopyTwoToneIcon from '@mui/icons-material/FolderCopyTwoTone';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Paper from '@mui/material/Paper';

interface FolderResponse {
  id: string,
  name: string,
  updatedAt: Date,
  size: number,
}
const formatDate = (date: Date) => {
  return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
  })
};

function RecentFolders() {

  const [folders, setFolders] = useState<FolderResponse[]>([])
  const getFolders = async () => {
    const response = await fetch('/api/folder');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    setFolders(result)
  };

  useEffect(() => {
    getFolders();
  }, [])

  return (

    <div className='tw-bg-white tw-mt-4 tw-rounded-l-3xl tw-p-6 tw-w-full tw-overflow-y-auto tw-max-h-80'>
      <div className="tw-flex tw-flex-row tw-justify-around tw-w-full tw-mb-1">
        <p className="tw-font-bold tw-text-lg">Recent Files</p>
        <a href="#" className="tw-font-medium tw-text-blue-600 tw-dark:text-blue-500 tw-hover:underline">View all</a>
      </div>
      <TableContainer component={Paper} >
        <Table sx={{ width: "100%", fontSize: "60px"}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>File Name</TableCell>
              <TableCell align="right">Modified</TableCell>
              <TableCell align="right">Size</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {folders.map((folder) => (
              <TableRow
                key={folder.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 }, fontSize: "60px" }}
              >
                <TableCell component="th" scope="row">
                <FolderCopyTwoToneIcon style={{ margin: "5px", fontSize: "15px", color: "#f0c865" }} />
                  {folder.name}
                </TableCell>
                <TableCell align="right">{formatDate(folder.updatedAt)}</TableCell>
                <TableCell align="right">{(folder.size / (1024 * 1024)).toPrecision(2)} MB</TableCell>
                <TableCell align="right">
                  <MoreVertIcon />
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default RecentFolders