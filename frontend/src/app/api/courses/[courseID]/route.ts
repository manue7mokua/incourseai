import { NextRequest, NextResponse } from "next/server";
import { LMSFactory } from "@/lib/api";

export async function GET(request: NextRequest, { params }: { params: { courseID: string } }) {
    const courseID = (await params).courseID.split('-')[1];
    const lms = (await params).courseID.split('-')[0];
    const apiBaseUrl = process.env.CANVAS_API_BASE_URL ?? '';
    const apiKey = process.env.CANVAS_API_KEY ?? '';
    const lmsFactory = new LMSFactory(apiBaseUrl, apiKey);
    const lmsProvider = lmsFactory.createLMSProvider(lms);

    const course = await lmsProvider.getCourse(courseID);
    return NextResponse.json(course);
}