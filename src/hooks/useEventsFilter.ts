import type { EventListItem } from '../types/types';

export function useEventsFilter(events: EventListItem[]) {
  const filterEvents = (searchText: string, status: string, accessLevel: string): EventListItem[] => {
    let filtered = events;

    // Фильтр по поиску
    if (searchText && searchText.trim() !== '') {
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    // Фильтр по статусу
    if (status) {
      filtered = filtered.filter(event => event.status === status);
    }

    // Фильтр по уровню доступа
    if (accessLevel) {
      filtered = filtered.filter(event => event.accessLevel === accessLevel);
    }

    return filtered;
  };

  return { filterEvents };
}