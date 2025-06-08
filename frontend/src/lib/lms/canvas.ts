import { Course, FileDetails, Module, ModuleItem } from "../types/course";
import LMSProvider from "./lms-provider";

class CanvasProvider extends LMSProvider {
    apiBaseUrl: string;
    apiKey: string;

    constructor(apiBaseUrl: string, apiKey: string) {
        super();
        this.apiBaseUrl = apiBaseUrl;
        this.apiKey = apiKey;
    }

    convertCanvasCourse(courseData: any): Course {
        const fullCourseName = courseData.name
        let courseSemester = ''
        let courseYear = ''
        let courseCode = ''
        if (fullCourseName != null) {
            if (fullCourseName.includes('Spring')) {
                courseSemester = 'Spring'
            } else if (fullCourseName.includes('Summer')) {
                courseSemester = 'Summer'
            } else if (fullCourseName.includes('Fall')) {
                courseSemester = 'Fall'
            } else if (fullCourseName.includes('Winter')) {
                courseSemester = 'Winter'
            }
            // match the year in the full course name
            const yearMatch = fullCourseName.match(/\d{4}/);
            if (yearMatch) {
                courseYear = yearMatch[0];
            } else {
                courseYear = 'Not found'
            }

            // 2024 Fall Faculty-Student Team Project (VIP) (EECE-302-01)
            // 2024 Fall Microcomputer Design (EECE-416-01)
            // match what is in the last brackets
            const courseCodeMatch = fullCourseName.match(/\(([^)]+)\)$/);
            courseCode = courseCodeMatch ? courseCodeMatch[1] : '';
        } else {
            courseCode = 'Not found'
            courseYear = 'Not found'
            courseSemester = 'Not found'
        }

        const course: Course = {
            id: null,
            lmsId: courseData.id,
            lmsProvider: 'canvas',
            name: courseData.name,
            code: courseCode,
            instructor: null,
            description: null,
            semester: courseSemester,
            year: courseYear,
        };
        return course;
    }

    convertCanvasModule(moduleData: any, courseId: string): Module {
        const module: Module = {
            id: null,
            lmsId: moduleData.id,
            courseId: courseId,
            name: moduleData.name,
            description: null,
            itemsCount: moduleData.items_count,
            moduleItems: [],
        };
        return module;
    }

    convertCanvasModuleItem(moduleItemData: any, moduleId: string, courseId: string): ModuleItem {
        const moduleItem: ModuleItem = {
            id: null,
            lmsId: moduleItemData.id,
            name: moduleItemData.title,
            moduleId: moduleId,
            courseId: courseId,
            type: moduleItemData.type,
            url: moduleItemData.url,
            lmsContentId: moduleItemData.content_id,
        };
        return moduleItem;
    }

    convertCanvasFileDetails(fileDetailsData: any): FileDetails {
        const fileDetails: FileDetails = {
            id: null,
            canvasId: fileDetailsData.id,
            name: fileDetailsData.filename,
            url: fileDetailsData.url,
            size: fileDetailsData.size,
            type: fileDetailsData['content-type'],
        };
        return fileDetails;
    }

    async getCourses(): Promise<Course[]> {
        const coursesResponse = await fetch(`${this.apiBaseUrl}/courses?per_page=100`, {
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            }
        });
        if (!coursesResponse.ok) {
            throw new Error('Failed to fetch courses');
        }
        const coursesData = await coursesResponse.json();

        // eliminate courses whose name is null
        const filteredCourses = coursesData.filter((course: any) => {
            if (course.access_restricted_by_date) {
                return false;
            }
            return true;
        });
        return filteredCourses.map((course: any) => this.convertCanvasCourse(course));
    }

    async getCourse(courseId: string): Promise<Course> {
        const response = await fetch(`${this.apiBaseUrl}/courses/${courseId}`, {
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch course');
        }
        const courseData = await response.json();
        return this.convertCanvasCourse(courseData);
    }

    async getCourseModules(courseId: string): Promise<Module[]> {
        const modulesResponse = await fetch(`${this.apiBaseUrl}/courses/${courseId}/modules?per_page=100`, {
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            }
        });
        if (!modulesResponse.ok) {
            throw new Error('Failed to fetch course modules');
        }
        const modulesData = await modulesResponse.json();
        const modules = modulesData.map((module: any) => this.convertCanvasModule(module, courseId));
        for (const module of modules) {
            const moduleItems = await this.getModuleItems(module.lmsId, courseId);
            module.moduleItems = moduleItems;
        }
        return modules;
    }

    async getModuleItems(moduleId: string, courseId: string): Promise<ModuleItem[]> {
        const moduleItemsResponse = await fetch(`${this.apiBaseUrl}/courses/${courseId}/modules/${moduleId}/items?per_page=100`, {
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            }
        });
        if (!moduleItemsResponse.ok) {
            throw new Error('Failed to fetch module items');
        }
        const moduleItemsData = await moduleItemsResponse.json();
        return moduleItemsData.map((moduleItem: any) => this.convertCanvasModuleItem(moduleItem, moduleId, courseId));
    }

    async getFileDetails(fileId: string, courseId: string): Promise<FileDetails> {
        const url = `${this.apiBaseUrl}/courses/${courseId}/files/${fileId}`;

        const fileDetailsResponse = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            }
        });
        if (!fileDetailsResponse.ok) {
            throw new Error('Failed to fetch file details');
        }
        const fileDetailsData = await fileDetailsResponse.json();
        return this.convertCanvasFileDetails(fileDetailsData);
    }
}

export default CanvasProvider;