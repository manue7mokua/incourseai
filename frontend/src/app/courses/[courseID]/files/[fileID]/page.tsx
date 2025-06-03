import Viewer from "@/components/pdf-viewer";

export default async function FileViewPage({ params }: { params: { fileID: string } }) {
  const fileID = (await params).fileID
  return <div className="max-h-screen p-5 bg-gradient-to-br from-orange-50 to-pink-50">
    <Viewer fileID={fileID}/>
  </div>
}
