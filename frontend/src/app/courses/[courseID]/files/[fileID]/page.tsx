import Viewer from "@/components/pdf-viewer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default async function FileViewPage({
  params,
}: {
  params: { fileID: string };
}) {
  const fileID = (await params).fileID;
  return (
    <div className="min-h-screen p-5 bg-gradient-to-br from-orange-50 to-pink-50">
      <div className="flex items-center gap-2 mb-2">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="gap-1">
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1>File name goes here</h1>
      </div>
      <Viewer fileID={fileID} />
    </div>
  );
}
