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
function createData(
    name: string,
    size: number,
    modified: number,
) {
    return { name, modified, size };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0,),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Cupcake', 305, 67),
    createData('Gingerbread', 356, 16.0),
    createData('Eclair', 262, 16.0),
    createData('Ice cream sandwich2', 237, 9.0),
    createData('Cupcake2', 305, 67),
    createData('Gingerbread2', 356, 16.0),
    createData('Eclair2', 262, 16.0),
];

export default function BasicTable() {
    return (
        <div className='tw-bg-white tw-mt-4 tw-rounded-l-3xl tw-p-8 tw-w-full tw-overflow-auto'>
        <p className='tw-ml-5 tw-mt-2 tw-font-bold tw-text-lg tw-mb-4'>Recent Files</p>
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: "100%", fontSize: "60px" }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>File Name</TableCell>
                        <TableCell align="right">Modified</TableCell>
                        <TableCell align="right">Size</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } , fontSize: "60px"}}
                        >
                            <TableCell component="th" scope="row">
                                <InsertDriveFileIcon className='tw-mr-2'/>
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.modified}</TableCell>
                            <TableCell align="right">{row.size}</TableCell>
                            <TableCell align="right">
                                <MoreVertIcon/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        </div>

    );
}
