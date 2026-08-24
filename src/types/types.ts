// Типы для мероприятий на основе реального ответа от бекенда

export type EventType = {
  id: number;
  code: string;
  name: string;
};

export type Organizer = {
  id: number;
  name: string;
  shortName: string;
};

export type Location = {
  country: string;
  region: string;
  city: string;
};

export type Tag = {
  id: number;
  name: string;
  color: string;
};

export type EventListItem = {
  cardId: number;
  title: string;
  type: EventType;
  organizer: Organizer;
  location: Location;
  dateStart: string;
  dateEnd: string;
  status: string;
  accessLevel: string;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  publishedAt: string | null;
  description: string;
};

export type Event = EventListItem;