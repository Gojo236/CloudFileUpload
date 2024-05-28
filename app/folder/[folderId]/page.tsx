import { useRouter } from 'next/router'
import React from 'react'

function Folder({params}: {
    params: {folderId: string} 
}) {
    return (
        <div>Folder {params.folderId}</div>
    )
}

export default Folder