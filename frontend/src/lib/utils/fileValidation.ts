/**
 * File Content Type Validation Utilities
 *
 * This module provides utilities for validating file types before processing
 * to ensure only supported file types are handled by the AI features.
 */

// Supported file types for AI processing
export const SUPPORTED_FILE_TYPES = {
  // Document types
  "application/pdf": "PDF Document",
  "application/msword": "Microsoft Word Document",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
    "Microsoft Word Document (DOCX)",
  "text/plain": "Plain Text",
  "text/markdown": "Markdown",
  "text/html": "HTML Document",

  // Presentation types
  "application/vnd.ms-powerpoint": "Microsoft PowerPoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation":
    "Microsoft PowerPoint (PPTX)",

  // Spreadsheet types
  "application/vnd.ms-excel": "Microsoft Excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
    "Microsoft Excel (XLSX)",

  // Code files
  "text/javascript": "JavaScript",
  "text/typescript": "TypeScript",
  "text/x-python": "Python",
  "text/x-java": "Java",
  "text/x-c++src": "C++",
  "text/x-c": "C",
  "text/xml": "XML",
  "application/json": "JSON",

  // Image types (for OCR processing)
  "image/jpeg": "JPEG Image",
  "image/png": "PNG Image",
  "image/gif": "GIF Image",
  "image/webp": "WebP Image",
} as const;

export type SupportedFileType = keyof typeof SUPPORTED_FILE_TYPES;

/**
 * Validates if a file type is supported for AI processing
 */
export function isSupportedFileType(contentType: string): boolean {
  return contentType in SUPPORTED_FILE_TYPES;
}

/**
 * Gets the human-readable name for a supported file type
 */
export function getFileTypeName(contentType: string): string | null {
  return SUPPORTED_FILE_TYPES[contentType as SupportedFileType] || null;
}

/**
 * Validates file details and returns validation result
 */
export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  fileTypeName?: string;
}

export function validateFileForProcessing(
  contentType: string,
  fileName: string,
  fileSize: number
): FileValidationResult {
  // Check if file type is supported
  if (!isSupportedFileType(contentType)) {
    return {
      isValid: false,
      error: `Unsupported file type: ${contentType}. Supported types: ${Object.keys(
        SUPPORTED_FILE_TYPES
      ).join(", ")}`,
    };
  }

  // Check file size (max 50MB for processing)
  const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
  if (fileSize > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: `File too large: ${(fileSize / 1024 / 1024).toFixed(
        2
      )}MB. Maximum size: 50MB`,
    };
  }

  // Check for suspicious file extensions
  const suspiciousExtensions = [".exe", ".bat", ".cmd", ".com", ".scr", ".pif"];
  const fileExtension = fileName
    .toLowerCase()
    .substring(fileName.lastIndexOf("."));
  if (suspiciousExtensions.includes(fileExtension)) {
    return {
      isValid: false,
      error: `Potentially unsafe file type: ${fileExtension}`,
    };
  }

  return {
    isValid: true,
    fileTypeName: getFileTypeName(contentType),
  };
}

/**
 * Filters a list of files to only include supported types
 */
export function filterSupportedFiles<
  T extends { type: string; name: string; size: number }
>(files: T[]): T[] {
  return files.filter((file) => {
    const validation = validateFileForProcessing(
      file.type,
      file.name,
      file.size
    );
    return validation.isValid;
  });
}
