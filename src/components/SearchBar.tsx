import { useState, useEffect } from 'react';
import { Input, Dropdown, Button, Space } from 'antd';
import { FilterOutlined, LockOutlined, GlobalOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

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

  useEffect(() => {
    setLocalSearch(searchValue);
  }, [searchValue]);

  const statusMenuItems: MenuProps['items'] = [
    { key: '', label: 'Все статусы' },
    { key: 'PUBLISHED', label: 'Опубликован' },
    { key: 'DRAFT', label: 'Черновик' },
  ];

  const handleStatusClick: MenuProps['onClick'] = ({ key }) => {
    onStatusChange(key);
  };

  const accessMenuItems: MenuProps['items'] = [
    { key: '', label: 'Все доступы' },
    { key: 'PUBLIC', label: 'Публичный' },
    { key: 'RESTRICTED', label: 'Ограниченный' },
  ];

  const handleAccessClick: MenuProps['onClick'] = ({ key }) => {
    onAccessLevelChange(key);
  };

  const getAccessIcon = () => {
    if (accessLevelValue === 'PUBLIC') return <GlobalOutlined />;
    if (accessLevelValue === 'RESTRICTED') return <LockOutlined />;
    return <LockOutlined />;
  };

  return (
    <div style={{ display: 'flex', gap: '12px', marginBottom: 16, alignItems: 'center' }}>
      <Input.Search
        placeholder="Введите название мероприятия"
        value={localSearch}
        onChange={(e) => {
          const value = e.target.value;
          setLocalSearch(value);
          onSearch(value);
        }}
        onSearch={() => onSearch(localSearch)}
        style={{ flex: 1 }}
        size="large"
      />
      
      <Space>
        <Dropdown 
          menu={{ items: statusMenuItems, onClick: handleStatusClick }}
          trigger={['click']}
        >
          <Button 
            type={statusValue ? 'primary' : 'default'}
            icon={<FilterOutlined />}
            size="large"
          />
        </Dropdown>

        <Dropdown 
          menu={{ items: accessMenuItems, onClick: handleAccessClick }}
          trigger={['click']}
        >
          <Button 
            type={accessLevelValue ? 'primary' : 'default'}
            icon={getAccessIcon()}
            size="large"
          />
        </Dropdown>
      </Space>
    </div>
  );
}
