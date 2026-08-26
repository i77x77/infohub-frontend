import { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, Descriptions, Button, message, Tag, Space, Typography, Result } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getEventById } from '../api/eventsApi';
import type { Event } from '../types/types';

const { Title, Text } = Typography;

export default function EventCardPage() {
  const params = useParams();
  const id = params.id ? Number(params.id) : NaN;
  const navigate = useNavigate();
  const location = useLocation();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isNaN(id)) {
      loadEvent(id);
    } else {
      setError('Некорректный ID мероприятия');
    }
  }, [id]);

  const loadEvent = async (eventId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getEventById(eventId);
      setEvent(data);
    } catch (err) {
      let errorMessage = 'Не удалось загрузить мероприятие';
      if (err instanceof Error) {
        if (err.message.includes('404')) {
          errorMessage = 'Мероприятие с таким ID не найдено. Проверьте правильность ссылки.';
        } else if (err.message.includes('Failed to fetch')) {
          errorMessage = 'Не удалось подключиться к серверу. Проверьте интернет-соединение.';
        } else {
          errorMessage = err.message;
        }
      }
      setError(errorMessage);
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || '';
    const status = params.get('status') || '';
    const accessLevel = params.get('accessLevel') || '';
    let url = '/events';
    const queryParams = [];
    if (search) queryParams.push(`search=${search}`);
    if (status) queryParams.push(`status=${status}`);
    if (accessLevel) queryParams.push(`accessLevel=${accessLevel}`);
    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }
    navigate(url);
  };

  if (loading) {
    return (
      <div style={{ padding: 24, textAlign: 'center', minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Result
          status="warning"
          title="Мероприятие не найдено"
          subTitle={error}
          extra={[
            <Button type="primary" key="back" onClick={handleBack}>
              Вернуться к списку
            </Button>,
          ]}
        />
      </div>
    );
  }

  if (!event) {
    return (
      <div style={{ padding: 24, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Result
          status="info"
          title="Мероприятие не найдено"
          subTitle="Возможно, оно было удалено или ссылка неверна."
          extra={[
            <Button type="primary" key="back" onClick={handleBack}>
              Вернуться к списку
            </Button>,
          ]}
        />
      </div>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={handleBack}
        style={{ marginBottom: 16 }}
      >
        Назад к списку
      </Button>

      <div style={{ marginBottom: 8 }}>
        <Text type="secondary" style={{ fontSize: 14 }}>
          Мероприятие / {event.title}
        </Text>
      </div>

      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Title level={3} style={{ marginBottom: 8 }}>{event.title}</Title>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Tag color={event.status === 'PUBLISHED' ? 'green' : 'orange'}>
              {event.status === 'PUBLISHED' ? 'Опубликован' : 'Черновик'}
            </Tag>
            {event.status !== 'PUBLISHED' && (
              <Button type="primary" size="small">
                Опубликовать
              </Button>
            )}
          </div>
        </div>

        <div style={{ marginBottom: 16 }}>
          <Tag color="cyan">{event.type?.name || '—'}</Tag>
          <Text type="secondary" style={{ marginLeft: 8 }}>
            {event.organizer?.name || '—'}
          </Text>
        </div>

        <Title level={5}>Главная информация</Title>
        <Descriptions bordered column={1} style={{ marginTop: 8 }}>
          <Descriptions.Item label="Тип мероприятия">
            {event.type?.name || '—'}
          </Descriptions.Item>
          <Descriptions.Item label="Место проведения">
            {event.location?.city 
              ? `${event.location.city}, ${event.location.region}` 
              : '—'
            }
          </Descriptions.Item>
          <Descriptions.Item label="Дата проведения">
            {new Date(event.dateStart).toLocaleDateString('ru-RU')} г. – {new Date(event.dateEnd).toLocaleDateString('ru-RU')} г.
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