import type { EventListItem, Event } from '../types/types';

// Базовый URL - пустая строка, запросы идут через прокси
const API_URL = '';

// Получить список мероприятий
export async function getEvents(): Promise<EventListItem[]> {
  const response = await fetch(`${API_URL}/api/events/pageable`);
  
  if (!response.ok) {
    throw new Error(`Ошибка загрузки мероприятий: ${response.status}`);
  }
  
  const data = await response.json();
  return data.content || data;
}

// Получить карточку мероприятия по ID
export async function getEventById(id: number): Promise<Event> {
  const response = await fetch(`${API_URL}/api/events/${id}`);
  
  if (!response.ok) {
    throw new Error(`Ошибка загрузки мероприятия ${id}: ${response.status}`);
  }
  
  return response.json();
}