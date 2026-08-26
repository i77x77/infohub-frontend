import { useState, useEffect } from 'react';
import { message } from 'antd';
import { getEvents } from '../api/eventsApi';
import type { EventListItem } from '../types/types';

export function useEvents() {
  const [events, setEvents] = useState<EventListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      let errorMessage = 'Не удалось загрузить мероприятия';
      
      if (err instanceof Error) {
        if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
          errorMessage = 'Не удалось подключиться к серверу. Проверьте интернет-соединение и обратитесь к администратору.';
        } else if (err.message.includes('404')) {
          errorMessage = 'Мероприятия не найдены. Проверьте правильность запроса.';
        } else if (err.message.includes('500')) {
          errorMessage = 'На сервере произошла ошибка. Попробуйте позже.';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // Фильтрация на клиенте по поиску, статусу и уровню доступа
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

  useEffect(() => {
    loadEvents();
  }, []);

  return { 
    loading, 
    error, 
    filterEvents,
    refetch: loadEvents 
  };
}