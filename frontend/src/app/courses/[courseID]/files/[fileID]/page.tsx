import Viewer from "@/components/file-viewer";

export default async function FileViewPage({ params }: { params: { fileID: string } }) {
  const fileID = (await params).fileID
  return <Viewer fileID={fileID} />;
}
