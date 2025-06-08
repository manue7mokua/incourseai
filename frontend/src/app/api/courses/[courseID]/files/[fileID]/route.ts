import { NextRequest, NextResponse } from "next/server";
import { LMSFactory } from "@/lib/api";

export async function GET(request: NextRequest, { params }: { params: { courseID: string, fileID: string } }) {
    const courseID = (await params).courseID.split('-')[1];
    const lms = (await params).courseID.split('-')[0];
    const fileID = (await params).fileID;

    const apiBaseUrl = process.env.CANVAS_API_BASE_URL ?? '';
    const apiKey = process.env.CANVAS_API_KEY ?? '';
    const lmsFactory = new LMSFactory(apiBaseUrl, apiKey);
    const lmsProvider = lmsFactory.createLMSProvider(lms);

    const fileDetails = await lmsProvider.getFileDetails(fileID, courseID);
    console.log(fileDetails);
    return NextResponse.json(fileDetails);
}