import { useState, useEffect } from 'react';
import { fetchDocuments } from '../../api/documentsApi';
import type { IDocument } from '../../interfaces/IDocument';

export function useDocuments(search?: string) {
  const [data, setData] = useState<IDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await fetchDocuments(search);

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
  }, [search]);

  return {
    data,
    loading,
    error,
  };
}
