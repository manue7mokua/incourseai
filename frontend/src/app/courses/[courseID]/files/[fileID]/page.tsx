import Viewer from "@/components/pdf-viewer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { FileDetails } from "@/lib/types/course";

function getViewer(fileDetails: FileDetails) {
  if (fileDetails.type === "application/pdf") {
    return <Viewer fileDetails={fileDetails} />;
  } else {
    return (
      <div className="text-center text-red-500">
        Unsupported file type: {fileDetails.type}. Please upload a PDF file.
      </div>
    );
  }
}


export default async function FileViewPage({
  params,
}: {
  params: { fileID: string, courseID: string };
}) {
  const fileID = (await params).fileID;
  const courseID = (await params).courseID;

  const fileDetails = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses/${courseID}/files/${fileID}`).then(res => res.json()) as FileDetails;

  return (
    <div className="min-h-screen px-5 pt-5 bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="flex items-center gap-2 mb-2">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="text-xl font-semibold">{fileDetails.name}</h1>
      </div>
      {getViewer(fileDetails)}
    </div>
  );
}
