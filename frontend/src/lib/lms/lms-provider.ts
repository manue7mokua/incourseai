import { Course, Module, ModuleItem } from "../types/course";

abstract class LMSProvider {
    abstract getCourses(): Promise<Course[]>;
    abstract getCourse(courseId: string): Promise<Course>;
    abstract getCourseModules(courseId: string): Promise<Module[]>;
    abstract getModuleItems(moduleId: string, courseId: string): Promise<ModuleItem[]>;
}

export default LMSProvider;