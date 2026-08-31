import { Button, Result, Spin, message } from 'antd';
import { useRef, useEffect } from 'react';
import { useEventsPage } from '../hooks';
import { EventTable, SearchBar, ErrorBoundary } from '../components';
import '../styles/components/EventsPage.css';

export default function EventsPage() {
  const {
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
  } = useEventsPage();

  const errorShown = useRef(false);

  useEffect(() => {
    if (error && !errorShown.current) {
      message.error(error);
      errorShown.current = true;
    }
    if (!error) {
      errorShown.current = false;
    }
  }, [error]);

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

        <div className="counter">Всего мероприятий: {filteredEvents.length}</div>

        {filteredEvents.length === 0 && !loading && (
          <div className="emptyState">
            {searchText || statusFilter || accessLevelFilter
              ? 'Ничего не найдено. Попробуйте изменить запрос.'
              : 'Нет мероприятий'}
          </div>
        )}

        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
            <Spin size="large" />
          </div>
        )}

        {!loading && filteredEvents.length > 0 && (
          <EventTable events={filteredEvents} loading={loading} />
        )}
      </div>
    </ErrorBoundary>
  );
}