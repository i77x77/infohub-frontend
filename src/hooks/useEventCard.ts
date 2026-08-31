import { useState, useEffect, useRef } from 'react'; 
import { message } from 'antd';
import { getEventById } from '../api/eventsApi';
import type { Event } from '../types/types';

export function useEventCard(id: number) {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const errorShown = useRef(false); // ← добавляем флаг

  useEffect(() => {
    if (isNaN(id)) {
      setError('Некорректный ID мероприятия');
      return;
    }

    const loadEvent = async () => {
      setLoading(true);
      setError(null);
      errorShown.current = false; 
      try {
        const data = await getEventById(id);
        setEvent(data);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Не удалось загрузить мероприятие';
        setError(errorMessage);
        
        if (!errorShown.current) {
          message.error(errorMessage);
          errorShown.current = true;
        }
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  return { event, loading, error };
}