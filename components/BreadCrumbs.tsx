"use client";
import { Breadcrumbs, Link, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React from 'react'
import { emphasize, styled } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor =
      theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[800];
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: emphasize(backgroundColor, 0.06),
      },
      '&:active': {
        boxShadow: theme.shadows[1],
        backgroundColor: emphasize(backgroundColor, 0.12),
      },
    };
  }) as typeof Chip;
function BreadCrumbs() {
    const search = useSearchParams()
    const folderId = search.get("folderId")
    const getBreadCrumbsList = async () => {
        const response = await fetch(`/api/folderNavigation?folderId=${folderId}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result);
        return result
    };

    const { data: files, isLoading } = useQuery({ queryKey: ['breadCrumbs', folderId], queryFn: getBreadCrumbsList })

    if (isLoading)
        return "Loading";
    return (
        <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: "15px" }}>
            {
                files?.map((it: any, index: any) => {
                    return <div key = {it.id}>
                        {/* <Link underline="hover" color="inherit" href={`?folderId=${it.id}`}>
                            {it.name}
                        </Link> */}
                        {it.id == ""?
                        <StyledBreadcrumb component="a" href="/" label={it.name} sx={{fontSize: "1rem"}}/>:
                        <StyledBreadcrumb component="a" href="?folderId=${it.id}" label={it.name} sx={{fontSize: "1rem", cursor: "pointer"}}/>
                        }
                        {/* <Link
                            underline="hover"
                            color="inherit"
                            href="/material-ui/getting-started/installation/"
                        >
                            Core
                        </Link>
                        <Typography color="text.primary">Breadcrumbs</Typography> */}
                    </div>
                })
            }

        </Breadcrumbs>
    )
}

export default BreadCrumbs