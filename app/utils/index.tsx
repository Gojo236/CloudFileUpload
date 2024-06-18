export const handleFileInput = async (
  e: React.ChangeEvent<HTMLInputElement>,
  folderId: string | null,
) => {
  console.log("Hello world");
  console.log(folderId);
  if (e.target.files && e.target.files[0]) {
    console.log(e.target.files[0]);
    const body = new FormData();
    body.append("file", e.target.files[0]);
    folderId && body.append("parentFolder", folderId);
    try {
      const response = await fetch("/api/file", {
        method: "POST",
        body: body,
      });

      if (response.ok) {
        const result = await response.json();
        console.log("File uploaded successfully:", result);
        alert("File Uploaded Successfully");
      } else {
        console.error("Error uploading file:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }
};

export enum SideBarOptions {
  Home = "Home",
  Files = "Files",
  Starred = "Starred",
  Trash = "Trash",
}
