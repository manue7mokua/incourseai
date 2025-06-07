import { NextRequest, NextResponse } from "next/server";
import { LMSFactory } from "@/lib/api";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const lms = searchParams.get('lms') ?? 'canvas';
    const apiBaseUrl = process.env.CANVAS_API_BASE_URL ?? '';
    const apiKey = process.env.CANVAS_API_KEY ?? '';
    const lmsFactory = new LMSFactory(apiBaseUrl, apiKey);
    const lmsProvider = lmsFactory.createLMSProvider(lms);

    const courses = await lmsProvider.getCourses();
    return NextResponse.json(courses);
}