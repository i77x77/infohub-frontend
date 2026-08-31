import type {
  DocumentType,
  EventBrief,
  TagItem,
} from '../interfaces/IDocumentGeneral';

export interface IDocument {
  cardId: number;
  title: string;
  type: DocumentType;
  docDate?: string;
  status: 'DRAFT' | 'PUBLISHED';
  accessLevel: 'PUBLIC' | 'RESTRICTED';
  event?: EventBrief | null;
  tags: TagItem[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}
