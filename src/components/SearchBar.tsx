import { useState, useEffect } from 'react';
import { Input, Select } from 'antd';

interface SearchBarProps {
  searchValue: string;
  statusValue: string;
  accessLevelValue: string;
  onSearch: (value: string) => void;
  onStatusChange: (value: string) => void;
  onAccessLevelChange: (value: string) => void;
}

export default function SearchBar({ 
  searchValue, 
  statusValue,
  accessLevelValue,
  onSearch, 
  onStatusChange,
  onAccessLevelChange
}: SearchBarProps) {
  const [localSearch, setLocalSearch] = useState(searchValue);
  const [localStatus, setLocalStatus] = useState(statusValue);
  const [localAccessLevel, setLocalAccessLevel] = useState(accessLevelValue);

  // Синхронизация с пропсами
  useEffect(() => {
    setLocalSearch(searchValue);
  }, [searchValue]);

  useEffect(() => {
    setLocalStatus(statusValue);
  }, [statusValue]);

  useEffect(() => {
    setLocalAccessLevel(accessLevelValue);
  }, [accessLevelValue]);

  // Поиск при нажатии Enter или лупы
  const handleSearch = () => {
    onSearch(localSearch);
  };

  return (
    <div style={{ display: 'flex', gap: '12px', marginBottom: 16, flexWrap: 'wrap' }}>
      <Input.Search
        placeholder="Введите название мероприятия"
        value={localSearch}
        onChange={(e) => {
          const value = e.target.value;
          setLocalSearch(value);
          onSearch(value);
        }}
        onSearch={handleSearch}
        style={{ width: 300 }}
        enterButton="Поиск"
      />
      
      <Select
        placeholder="Статус"
        value={localStatus || undefined}
        onChange={(value) => {
          setLocalStatus(value);
          onStatusChange(value);
        }}
        style={{ width: 150 }}
        options={[
          { value: '', label: 'Все статусы' },
          { value: 'PUBLISHED', label: 'Опубликован' },
          { value: 'DRAFT', label: 'Черновик' },
        ]}
        allowClear
      />

      <Select
        placeholder="Доступ"
        value={localAccessLevel || undefined}
        onChange={(value) => {
          setLocalAccessLevel(value);
          onAccessLevelChange(value);
        }}
        style={{ width: 150 }}
        options={[
          { value: '', label: 'Все' },
          { value: 'PUBLIC', label: 'Публичный' },
          { value: 'RESTRICTED', label: 'Ограниченный' },
        ]}
        allowClear
      />
    </div>
  );
}