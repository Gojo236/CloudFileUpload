"use client";
import React, { useEffect, useState } from 'react'
import FolderCopyTwoToneIcon from '@mui/icons-material/FolderCopyTwoTone';

interface FolderResponse {
  id: string,
  name: string,
}


function RecentFolders() {

  const [folders, setFolders] = useState<FolderResponse[]>([])
  const getFolders = async () => {
    const response = await fetch('/api/folder');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const result = await response.json();
    console.log(result);
    setFolders(result)
  };

  useEffect(() => {
    getFolders();
  }, [])

  return (
    <div className="tw-flex tw-flex-col tw-w-full tw-bg-white tw-mt-4 tw-rounded-l-3xl tw-p-4">
      <div className="tw-flex tw-flex-row tw-justify-around tw-w-full tw-m-2">
        <p className="tw-font-bold tw-text-lg">Recent Folders</p>
        <a href="#" className="tw-font-medium tw-text-blue-600 tw-dark:text-blue-500 tw-hover:underline">View all</a>
      </div>
      <div className="tw-flex tw-flex-row tw-gap-4 tw-flex-wrap tw-justify-around">
        {folders.map((item, index) => {
          return <div key={item.id} className="tw-max-w-32 tw-p-2 hover:tw-cursor-pointer hover:tw-scale-110">
            <FolderCopyTwoToneIcon style={{ margin: "5px", fontSize: "75px", color: "#f0c865" }} />
            <p>{item.name}</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default RecentFolders