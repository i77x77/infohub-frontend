import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card, Button, Tag, Typography, Result } from 'antd';
import { useEventCard } from '../hooks/useEventCard';
import { DraftBanner, EventInfoGrid, EventTags, EventDescription } from '../components/EventCard';
import '../styles/components/EventCardPage.css';
import { SoundOutlined } from '@ant-design/icons';

const { Title } = Typography;

export default function EventCardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const eventId = id ? Number(id) : NaN;
  const { event, loading, error } = useEventCard(eventId);

  const handleBack = () => {
    const params = new URLSearchParams(location.search);
    const search = params.get('search') || '';
    const status = params.get('status') || '';
    const accessLevel = params.get('accessLevel') || '';
    const queryParams = [];
    if (search) queryParams.push(`search=${search}`);
    if (status) queryParams.push(`status=${status}`);
    if (accessLevel) queryParams.push(`accessLevel=${accessLevel}`);
    const url = `/events${queryParams.length > 0 ? `?${queryParams.join('&')}` : ''}`;
    navigate(url);
  };

  if (loading) {
    return <div className="cardPage" style={{ textAlign: 'center', paddingTop: 48 }}>Загрузка...</div>;
  }

  if (error || !event) {
    return (
      <div className="cardPage" style={{ display: 'flex', justifyContent: 'center', paddingTop: 48 }}>
        <Result
          status="warning"
          title="Мероприятие не найдено"
          subTitle={error || 'Возможно, оно было удалено'}
          extra={<Button type="primary" onClick={handleBack}>Вернуться к списку</Button>}
        />
      </div>
    );
  }

  const isDraft = event.status === 'DRAFT';

  return (
    <div className="cardPage">
      {/* Верхняя панель */}
      <div className="topPanel">
        <div className="breadcrumb">
          <span className="breadcrumbLink">Мероприятия</span>
          <span className="breadcrumbSeparator">/</span>
          <span className="breadcrumbCurrent">{event.title}</span>
        </div>
        <div className="topActions">
          <Tag color={event.accessLevel === 'PUBLIC' ? 'blue' : 'red'}>
            {event.accessLevel === 'PUBLIC' ? 'Публичный' : 'Ограниченный'}
          </Tag>
          <Tag color={isDraft ? 'orange' : 'green'}>
            {isDraft ? 'Черновик' : 'Опубликован'}
          </Tag>
          {isDraft && (
            <Button type="primary" size="small" icon={<SoundOutlined />}>
              Опубликовать
            </Button>
          )}
        </div>
      </div>

      {/* Заголовок */}
      <div className="cardHeaderOutside">
        <div className="cardTitleWrapper">
          <span className="cardLabel">Мероприятие</span>
          <Title level={3} className="cardTitleOutside">{event.title}</Title>
        </div>
      </div>

      {/* Карточка */}
      <Card className="eventCard">
        {isDraft && <DraftBanner />}

        <div className="infoSection">
          <div className="infoTitle">Главная информация</div>
          <EventInfoGrid event={event} />
          <hr className="divider" />
          <EventTags tags={event.tags} />
          <hr className="divider" />
          {event.description && <EventDescription description={event.description} />}
        </div>
      </Card>
    </div>
  );
}