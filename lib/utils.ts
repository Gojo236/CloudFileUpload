import Folder from "@/model/Folder";

export async function updateParentFoldersSize(
    folderId: String | null | undefined,
    size: number,
  ) {
    if (!folderId) return;
    const folder = await Folder.findById(folderId);
    if (!folder) return;
    folder.size += size;
    folder.save();
    updateParentFoldersSize(folder.parentFolder, size);
  }
  