import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useEvents } from './useEvents';
import { useEventsFilter } from './useEventsFilter';

export function useEventsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { events, loading, error, refetch } = useEvents();
  const { filterEvents } = useEventsFilter(events);
  
  const questSearch = searchParams.get('search') || '';
  const questStatus = searchParams.get('status') || '';
  const questAccessLevel = searchParams.get('accessLevel') || '';
  
  const [searchText, setSearchText] = useState(questSearch);
  const [statusFilter, setStatusFilter] = useState(questStatus);
  const [accessLevelFilter, setAccessLevelFilter] = useState(questAccessLevel);
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  
  const filteredEvents = filterEvents(questSearch, questStatus, questAccessLevel);

  // Синхронизация с URL
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const accessLevel = searchParams.get('accessLevel') || '';
    setSearchText(search);
    setStatusFilter(status);
    setAccessLevelFilter(accessLevel);
  }, [searchParams]);

  const updateParams = (newParams: { search?: string; status?: string; accessLevel?: string }) => {
    const current = Object.fromEntries(searchParams.entries());
    const updated = { ...current, ...newParams };

    const result: { search?: string; status?: string; accessLevel?: string } = {};
    Object.keys(updated).forEach((key) => {
      const value = updated[key as keyof typeof updated];
      if (value) {
        result[key as keyof typeof result] = value;
      }
    });

    setSearchParams(result);
  };

  const handleSearch = (value: string) => {
    setSearchText(value);
    
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const newTimer = setTimeout(() => {
      updateParams({ search: value, status: statusFilter, accessLevel: accessLevelFilter });
    }, 512);

    setDebounceTimer(newTimer);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    updateParams({ search: searchText, status: value, accessLevel: accessLevelFilter });
  };

  const handleAccessLevelChange = (value: string) => {
    setAccessLevelFilter(value);
    updateParams({ search: searchText, status: statusFilter, accessLevel: value });
  };

  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  return {
    searchText,
    statusFilter,
    accessLevelFilter,
    filteredEvents,
    loading,
    error,
    refetch,
    handleSearch,
    handleStatusChange,
    handleAccessLevelChange,
  };
}