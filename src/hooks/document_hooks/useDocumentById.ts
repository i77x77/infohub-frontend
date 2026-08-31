// hooks/useDocumentById.ts
import { useState, useEffect } from 'react';
import { fetchDocumentsByID } from '../../api/documentsApi';
import type { IDocumentCard } from '../../interfaces/IDocumentCard';

export function useDocumentById(id?: string) {
  const [data, setData] = useState<IDocumentCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetchDocumentsByID(id);
        setData(response);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Произошла неизвестная ошибка',
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  return {
    data,
    loading,
    error,
  };
}
