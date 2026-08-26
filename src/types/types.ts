// Типы для мероприятий на основе Swagger Schemas

// Тип мероприятия (справочник)
export type EventType = {
  id: number;
  code: string;
  name: string;
};

// Организатор (справочник)
export type Organizer = {
  id: number;
  name: string;
  shortName: string;
  fullName?: string; // может быть в карточке
};

// Место проведения
export type Location = {
  country: string;
  region: string;
  city: string;
  address?: string; // может быть в карточке
};

// Тег
export type Tag = {
  id: number;
  name: string;
  color: string;
};

// Элемент списка мероприятий (GET /api/events/pageable)
export type EventListItem = {
  cardId: number;
  title: string;
  type: EventType;
  organizer: Organizer;
  location: Location;
  dateStart: string; // ISO date
  dateEnd: string; // ISO date
  status: 'DRAFT' | 'PUBLISHED'; // enum
  accessLevel: 'PUBLIC' | 'RESTRICTED'; // enum
  tags: Tag[];
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
  deletedAt: string | null;
  publishedAt: string | null;
  description: string;
};

// Карточка мероприятия (GET /api/events/{cardId})
// Включает все поля из списка + дополнительные
export type Event = EventListItem & {
  // Дополнительные поля для карточки (если есть)
  // Пока все поля уже есть в EventListItem
};

// Входные данные для создания мероприятия (POST /api/events)
export type EventInput = {
  title: string;
  eventTypeId: number;
  organizerId: number;
  locationId?: number;
  startDate: string; // ISO date
  endDate: string; // ISO date
  accessLevel?: 'PUBLIC' | 'RESTRICTED';
  tags?: number[]; // массив ID тегов
  description?: string;
};

// Входные данные для обновления мероприятия (PATCH /api/events/{cardId})
// Все поля опциональны (как в Swagger)
export type EventUpdate = {
  title?: string;
  eventTypeId?: number;
  organizerId?: number;
  locationId?: number;
  startDate?: string;
  endDate?: string;
  accessLevel?: 'PUBLIC' | 'RESTRICTED';
  tags?: number[];
  description?: string;
};

// Тип для ответа с пагинацией (если бэкенд вернёт)
export type EventsPageableResponse = {
  content: EventListItem[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
};