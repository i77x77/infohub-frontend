import type {
  DocumentType,
  EventBrief,
  TagItem,
  EmployeeBrief,
  DocumentFile,
} from '../interfaces/IDocumentGeneral';

export interface IDocumentCard {
  cardId: number;
  title: string;
  type: DocumentType;

  docDate?: string;

  status: 'DRAFT' | 'PUBLISHED';
  accessLevel: 'PUBLIC' | 'RESTRICTED';

  event?: EventBrief | null;
  tags: TagItem[];

  author?: EmployeeBrief | null;

  edmsUrl?: string;
  description?: string;

  file?: DocumentFile | null;

  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
  publishedAt?: string | null;
}
