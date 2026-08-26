import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Result } from 'antd';
import { useEvents } from '../hooks/useEvents';
import EventTable from '../components/EventTable';
import ErrorBoundary from '../components/ErrorBoundary';
import SearchBar from '../components/SearchBar';
import '../styles/EventsPage.css';

export default function EventsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading, error, filterEvents, refetch } = useEvents();
  
  const questSearch = searchParams.get('search') || '';
  const questStatus = searchParams.get('status') || '';
  const questAccessLevel = searchParams.get('accessLevel') || '';
  
  const [searchText, setSearchText] = useState(questSearch);
  const [statusFilter, setStatusFilter] = useState(questStatus);
  const [accessLevelFilter, setAccessLevelFilter] = useState(questAccessLevel);
  const [debounceTimer, setDebounceTimer] = useState<ReturnType<typeof setTimeout> | null>(null);
  
  // Фильтрация по поиску, статусу и уровню доступа
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

  // Поиск с debounce
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

  // Статус (без debounce)
  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    updateParams({ search: searchText, status: value, accessLevel: accessLevelFilter });
  };

  // Уровень доступа (без debounce)
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

  if (error) {
    return (
      <div className="page">
        <h1 className="header">Мероприятия</h1>
        <div className="subHeader">Удобное управление карточками</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40vh' }}>
          <Result
            status="warning"
            title="Не удалось загрузить мероприятия"
            subTitle={error}
            extra={[
              <Button type="primary" key="retry" onClick={refetch}>
                Попробовать снова
              </Button>,
            ]}
          />
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="page">
        <h1 className="header">Мероприятия</h1>
        <div className="subHeader">Удобное управление карточками</div>
        
        <SearchBar 
          searchValue={searchText}
          statusValue={statusFilter}
          accessLevelValue={accessLevelFilter}
          onSearch={handleSearch}
          onStatusChange={handleStatusChange}
          onAccessLevelChange={handleAccessLevelChange}
        />

        <div className="counter">
          Всего мероприятий: {filteredEvents.length}
        </div>

        {filteredEvents.length === 0 && !loading && (
          <div className="emptyState">
            {searchText || statusFilter || accessLevelFilter ? 'Ничего не найдено. Попробуйте изменить запрос.' : 'Нет мероприятий'}
          </div>
        )}

        {filteredEvents.length > 0 && (
          <EventTable 
            events={filteredEvents} 
            loading={loading} 
          />
        )}
      </div>
    </ErrorBoundary>
  );
}