"use client";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

interface FileResponse {
    id: string;
    name: string;
    docSize: number;
    updatedAt: Date;
    downloadURL: string;
};

const formatDate = (date: Date) => {
    return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
};
export default function BasicTable() {
    const getFiles = async () => {
        const response = await fetch('/api/file');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        // setFiles(result);
        return result
    };

    const {data: files, isLoading} = useQuery({ queryKey: ['files'], queryFn: getFiles })

    if(isLoading)
    {
        return <div>Loading</div>;
    }

    return (
        <div className='tw-bg-white tw-mt-4 tw-rounded-l-3xl tw-p-6 tw-w-full tw-overflow-y-auto'>
            <div className="tw-flex tw-flex-row tw-justify-around tw-w-full tw-mb-1">
                <p className="tw-font-bold tw-text-lg">Recent Files</p>
                <a href="#" className="tw-font-medium tw-text-blue-600 tw-dark:text-blue-500 tw-hover:underline">View all</a>
            </div>
            <TableContainer component={Paper} >
                <Table sx={{ width: "100%", fontSize: "60px" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>File Name</TableCell>
                            <TableCell align="right">Modified</TableCell>
                            <TableCell align="right">Size</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {files.map((file:any) => (
                            <TableRow
                                key={file.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, fontSize: "60px" }}
                            >
                                <TableCell component="th" scope="row">
                                    <InsertDriveFileIcon className='tw-mr-2' />
                                    {file.name}
                                </TableCell>
                                <TableCell align="right">{formatDate(file.updatedAt)}</TableCell>
                                <TableCell align="right">{(file.docSize / (1024 * 1024)).toPrecision(2)} MB</TableCell>
                                <TableCell align="right">
                                    <MoreVertIcon />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}
