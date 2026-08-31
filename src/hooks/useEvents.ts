import { useState, useEffect } from 'react';
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return { 
    events,
    loading, 
    error, 
    refetch: loadEvents 
  };
}