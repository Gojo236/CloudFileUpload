import React from 'react'
import FolderCopyTwoToneIcon from '@mui/icons-material/FolderCopyTwoTone';
function RecentFolders() {
    const folders = ["Folder 1", "Folder 2", "Study Material Pro Max", "Folder 1", "Folder 2", "Study Material Pro Max", "Folder 1", "Folder 2", "Study Material Pro Max"]
  return (
    <div className="tw-flex tw-flex-col tw-w-full tw-bg-white tw-mt-4 tw-rounded-3xl tw-p-4">
            <div className="tw-flex tw-flex-row tw-justify-around tw-w-full tw-m-2">
              <p className="tw-font-bold tw-text-lg">Recent Folders</p>
              <a href="#" className="tw-font-medium tw-text-blue-600 tw-dark:text-blue-500 tw-hover:underline">View all</a>
            </div>
            <div className="tw-flex tw-flex-row tw-gap-4 tw-flex-wrap">
              {folders.map((item)=>{
                return <div className="tw-max-w-32 tw-p-2">
                    <FolderCopyTwoToneIcon style={{margin: "5px",fontSize: "80px", color: "#f0c865" }}/>
                    <p>{item}</p>
                </div>
              })}
            </div>    
          </div>
  )
}

export default RecentFolders