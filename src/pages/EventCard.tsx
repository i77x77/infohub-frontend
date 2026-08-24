import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Descriptions, Button, message, Tag, Space } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getEventById } from '../api/eventsApi';
import type { Event } from '../types/types';

export default function EventCard() {
  // Получаем параметры маршрута и сразу преобразуем id в число
  const params = useParams();
  const id = params.id ? Number(params.id) : NaN;
  const navigate = useNavigate();

  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);

  // Загружаем данные при монтировании или изменении id
  useEffect(() => {
    if (!isNaN(id)) {
      loadEvent(id);
    } else {
      message.error('Некорректный ID мероприятия');
    }
  }, [id]);

  const loadEvent = async (eventId: number) => {
    setLoading(true);
    try {
      const data = await getEventById(eventId);
      console.log('ДАННЫЕ ОТ БЕКЕНДА:', data); // ЭТА СТРОЧКА НОВАЯ
      setEvent(data);
    } catch (error) {
      message.error('Не удалось загрузить мероприятие');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Отображение состояний загрузки и ошибки
  if (loading) {
    return <div style={{ padding: 24 }}>Загрузка...</div>;
  }

  if (!event) {
    return <div style={{ padding: 24 }}>Мероприятие не найдено</div>;
  }

  // Основной рендер карточки
  return (
    <div style={{ padding: 24 }}>
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/events')}
        style={{ marginBottom: 16 }}
      >
        Назад к списку
      </Button>

      <Card title={event.title} loading={loading}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Тип">
            {event.type?.name || '—'}
          </Descriptions.Item>
          <Descriptions.Item label="Организатор">
            {event.organizer?.name || '—'}
          </Descriptions.Item>
          <Descriptions.Item label="Место">
            {event.location?.city 
              ? `${event.location.city}, ${event.location.region}` 
              : '—'
            }
          </Descriptions.Item>
          <Descriptions.Item label="Дата начала">
            {new Date(event.dateStart).toLocaleDateString('ru-RU')}
          </Descriptions.Item>
          <Descriptions.Item label="Дата окончания">
            {new Date(event.dateEnd).toLocaleDateString('ru-RU')}
          </Descriptions.Item>
          <Descriptions.Item label="Статус">
            <Tag color={event.status === 'PUBLISHED' ? 'green' : 'orange'}>
              {event.status === 'PUBLISHED' ? 'Опубликовано' : 'Черновик'}
            </Tag>
          </Descriptions.Item>
          <Descriptions.Item label="Теги">
            <Space wrap>
              {event.tags?.map((tag) => (
                <Tag key={tag.id} color={tag.color}>
                  {tag.name}
                </Tag>
              ))}
            </Space>
          </Descriptions.Item>
          {event.description && (
            <Descriptions.Item label="Описание">
              {event.description}
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>
    </div>
  );
}