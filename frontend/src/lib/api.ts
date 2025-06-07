import CanvasProvider from "./lms/canvas";
import LMSProvider from "./lms/lms-provider";

export class LMSFactory {
    apiBaseUrl: string;
    apiKey: string;

    constructor(apiBaseUrl: string, apiKey: string) {
        this.apiBaseUrl = apiBaseUrl;
        this.apiKey = apiKey;
    }

    createLMSProvider(lms: string): LMSProvider {
        switch (lms) {
            case 'canvas':
                return new CanvasProvider(this.apiBaseUrl, this.apiKey);
            default:
                throw new Error(`Unsupported LMS: ${lms}`);
        }
    }
}

