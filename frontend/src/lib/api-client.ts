// API client for communicating with the backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface Course {
  id: string;
  name: string;
  code: string;
  description?: string;
  instructor?: string;
  semester?: string;
  year?: string;
  lms_id?: string;
  lms_provider?: string;
  created_at: string;
  updated_at: string;
}

export interface ApiError {
  detail: string;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData: ApiError = await response.json().catch(() => ({
          detail: `HTTP ${response.status}: ${response.statusText}`,
        }));
        throw new Error(errorData.detail);
      }

      // Handle empty responses
      const text = await response.text();
      if (!text) {
        return {} as T;
      }

      return JSON.parse(text);
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("An unexpected error occurred");
    }
  }

  // Course API methods
  async getCourses(sync: boolean = false): Promise<Course[]> {
    const params = new URLSearchParams();
    if (sync) {
      params.append("sync", "true");
    }

    const queryString = params.toString();
    const endpoint = queryString
      ? `/api/courses?${queryString}`
      : "/api/courses";

    return this.request<Course[]>(endpoint);
  }

  async getCoursesFromLms(): Promise<Course[]> {
    return this.request<Course[]>("/api/courses/lms");
  }

  async getCourse(courseId: string): Promise<Course> {
    return this.request<Course>(`/api/courses/${courseId}`);
  }

  async syncCourses(): Promise<Course[]> {
    return this.request<Course[]>("/api/courses/sync", {
      method: "POST",
    });
  }

  // LMS API methods
  async getLmsCourses(lms: string = "canvas"): Promise<Course[]> {
    return this.request<Course[]>(`/api/lms/courses?lms=${lms}`);
  }

  async getLmsCourse(
    courseId: string,
    lms: string = "canvas"
  ): Promise<Course> {
    return this.request<Course>(`/api/lms/courses/${courseId}?lms=${lms}`);
  }

  async testLmsConnection(
    lms: string = "canvas"
  ): Promise<{ status: string; message: string }> {
    return this.request<{ status: string; message: string }>(
      `/api/lms/test-connection?lms=${lms}`,
      {
        method: "POST",
      }
    );
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();

// Export the class for testing
export { ApiClient };
