export interface DocumentType {
  id: number;
  code: string;
  name: string;
}

export interface EventBrief {
  cardId: number;
  title: string;
}

export interface TagItem {
  id: number;
  name: string;
  color: string;
}

export interface EmployeeBrief {
  id: number;
  shortName?: string;
  fullName: string;
}

export interface DocumentFile {
  id: number;
  originalName: string;
  format: string;
  mimeType: string;
  sizeBytes: number;
  downloadUrl: string;
  uploadedAt: string;
}
