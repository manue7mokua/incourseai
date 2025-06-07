import { NextRequest, NextResponse } from "next/server";
import { LMSFactory } from "@/lib/api";

export async function GET(request: NextRequest, { params }: { params: { courseID: string } }) {
    const { courseID } = params;
    const lms = 'canvas';
    const apiBaseUrl = process.env.CANVAS_API_BASE_URL ?? '';
    const apiKey = process.env.CANVAS_API_KEY ?? '';
    const lmsFactory = new LMSFactory(apiBaseUrl, apiKey);
    const lmsProvider = lmsFactory.createLMSProvider(lms);

    const modules = await lmsProvider.getCourseModules(courseID);
    return NextResponse.json(modules);
}