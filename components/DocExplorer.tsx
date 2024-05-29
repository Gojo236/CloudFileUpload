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
import FolderCopyTwoToneIcon from '@mui/icons-material/FolderCopyTwoTone';
import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
interface FileInterface {
    id: string;
    name: string;
    size: number;
    updatedAt: Date;
    downloadURL: string;
};
interface FolderInterface {
    id: string;
    name: string;
    size: number;
    updatedAt: Date;
};

interface DocExplorerProps {
    files: FileInterface[];
    folders: FolderInterface[];
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
// { files: docs, folders }: DocExplorerProps
export default function DocExplorer() {
    const queryClient = useQueryClient()
    const search = useSearchParams()
    const folderId = search.get("folderId")
    const router = useRouter();
    const getFiles = async () => {
        const response = await fetch(`/api/folder?folderId=${folderId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result)
        return result
    };


    const { data, isLoading } = useQuery({ queryKey: ['foldersFiles', folderId], queryFn: getFiles})

    if (isLoading) {
        return <div>Loading</div>;
    }

    const userFolders = data?.userFolders
    const userDocs = data?.userDocs
    
    if(userDocs?.length + userFolders?.length  == 0)
    {
        return "Upload Files or add new folders";
    }
    return (
        <div className='tw-bg-white tw-mt-4 tw-rounded-l-3xl tw-p-6 tw-w-full tw-overflow-y-auto'>

            <TableContainer component={Paper} style={{ width: "100%", fontSize: "60px", maxHeight: "70vh", overflow: "auto" }}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Modified</TableCell>
                            <TableCell align="right">Size</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userFolders.map((folder: any) => (
                            // <div onClick={() => { console.log(folder.id) }}>
                                <TableRow
                                    key={folder.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, fontSize: "60px"}}
                                >
                                    <TableCell component="th" scope="row" onClick={()=>{
                                        router.push(`?folderId=${folder.id}`);
                                    }} sx={{cursor: "pointer"}}>
                                        <FolderCopyTwoToneIcon style={{ margin: "5px", fontSize: "25px", color: "#f0c865" }} />
                                        {folder.name}
                                    </TableCell>
                                    <TableCell align="right">{formatDate(folder.updatedAt)}</TableCell>
                                    <TableCell align="right">{(folder.size / (1024 * 1024)).toPrecision(2)} MB</TableCell>
                                    <TableCell align="right">
                                        <MoreVertIcon />
                                    </TableCell>
                                </TableRow>
                            // </div>
                        ))}
                        {userDocs.map((file: any) => (
                            <TableRow
                                key={file.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, fontSize: "60px" }}
                            >
                                <TableCell component="th" scope="row">
                                    <InsertDriveFileIcon className='tw-mr-2' />
                                    <a href={file.downloadURL}>
                                        {file.name}
                                    </a>
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
