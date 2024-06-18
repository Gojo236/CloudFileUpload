"use client";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FolderCopyTwoToneIcon from "@mui/icons-material/FolderCopyTwoTone";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import KebabMenu from "./KebabMenu";

interface DocExplorerProps {
  fetchDataURL: string;
}

const formatDate = (date: Date) => {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function DocExplorer({ fetchDataURL }: DocExplorerProps) {
  const router = useRouter();

  async function fetchData() {
    const response = await fetch(fetchDataURL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result;
  }
  const { data, isLoading } = useQuery({
    queryKey: ["foldersFiles"],
    queryFn: fetchData,
  });

  if (isLoading) {
    return <div>Loading</div>;
  }

  const userFolders = data?.userFolders;
  const userDocs = data?.userDocs;

  if (userDocs?.length + userFolders?.length == 0) {
    return (<div className="tw-p-2">Upload Files or add new folders</div>);
  }
  return (
    <div className="tw-bg-white tw-mt-4 tw-rounded-l-3xl tw-p-6 tw-w-full tw-overflow-y-auto">
      <TableContainer
        component={Paper}
        style={{
          width: "100%",
          fontSize: "60px",
          maxHeight: "70vh",
          overflow: "auto",
        }}
      >
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
            {userFolders?.map((folder: any) => (
              <TableRow
                key={folder.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  fontSize: "60px",
                }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  onClick={() => {
                    router.push(`?folderId=${folder.id}`);
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <FolderCopyTwoToneIcon
                    style={{
                      margin: "5px",
                      fontSize: "25px",
                      color: "#f0c865",
                    }}
                  />
                  {folder.name}
                </TableCell>
                <TableCell align="right">
                  {formatDate(folder.updatedAt)}
                </TableCell>
                <TableCell align="right">
                  {(folder.size / (1024 * 1024)).toPrecision(2)} MB
                </TableCell>
                <TableCell align="right">
                  <KebabMenu isFile={false} id={folder.id} name={folder.name} />
                </TableCell>
              </TableRow>
              // </div>
            ))}
            {userDocs?.map((file: any) => (
              <TableRow
                key={file.id}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  fontSize: "60px",
                }}
              >
                <TableCell component="th" scope="row">
                  <InsertDriveFileIcon className="tw-mr-2" />
                  <a
                    href={`/api/file/download?docId=${file.id}`}
                    download={file.name}
                  >
                    {file.name}
                  </a>
                </TableCell>
                <TableCell align="right">
                  {formatDate(file.updatedAt)}
                </TableCell>
                <TableCell align="right">
                  {(file.docSize / (1024 * 1024)).toPrecision(2)} MB
                </TableCell>
                <TableCell align="right">
                  <KebabMenu isFile={true} id={file.id} name={file.name} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
