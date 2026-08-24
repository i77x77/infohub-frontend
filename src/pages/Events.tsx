import { useEffect, useState } from 'react';
import { Table, message, Tag, Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { getEvents } from '../api/eventsApi';
import type { EventListItem } from '../types/types';
import { useNavigate } from 'react-router-dom';

export default function Events() {
  const [events, setEvents] = useState<EventListItem[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      message.error('Не удалось загрузить мероприятия');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const columns: ColumnsType<EventListItem> = [
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Тип',
      dataIndex: ['type', 'name'],
      key: 'type',
    },
    {
      title: 'Организатор',
      dataIndex: ['organizer', 'name'],
      key: 'organizer',
    },
    {
      title: 'Дата начала',
      dataIndex: 'dateStart',
      key: 'dateStart',
      render: (date) => new Date(date).toLocaleDateString('ru-RU'),
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'PUBLISHED' ? 'green' : 'orange'}>
          {status === 'PUBLISHED' ? 'Опубликовано' : 'Черновик'}
        </Tag>
      ),
    },
    {
      title: 'Действие',
      key: 'action',
      render: (_, record) => (
        <Button 
          type="link" 
          onClick={() => navigate(`/events/${record.cardId}`)}
        >
          Открыть
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h1>Мероприятия</h1>
      <Table 
        columns={columns} 
        dataSource={events} 
        loading={loading}
        rowKey="cardId"
        onRow={(record) => ({
          onClick: () => navigate(`/events/${record.cardId}`),
          style: { cursor: 'pointer' }
        })}
      />
    </div>
  );
}