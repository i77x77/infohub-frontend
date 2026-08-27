import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { EventListItem } from '../types/types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/EventsPage.css';

interface EventTableProps {
  events: EventListItem[];
  loading: boolean;
}

export default function EventTable({ events, loading }: EventTableProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleRowClick = (cardId: number) => {
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const accessLevel = searchParams.get('accessLevel') || '';
    let url = `/events/${cardId}`;
    const params = [];
    if (search) params.push(`search=${search}`);
    if (status) params.push(`status=${status}`);
    if (accessLevel) params.push(`accessLevel=${accessLevel}`);
    if (params.length > 0) {
      url += `?${params.join('&')}`;
    }
    navigate(url);
  };

  const columns: ColumnsType<EventListItem> = [
  {
    title: 'Тип мероприятия',
    dataIndex: ['type', 'name'],
    key: 'type',
    width: '14%',
    render: (typeName: string) => (
      <Tag style={{ 
        backgroundColor: 'transparent', 
        color: '#000000',
        border: '1px solid #d9d9d9',
        borderRadius: '4px',
        padding: '2px 12px',
        fontSize: '15px',  // ← было 12px
      }}>
        {typeName}
      </Tag>
    ),
  },
  {
    title: 'Название',
    dataIndex: 'title',
    key: 'title',
    width: '24%',
    render: (title: string) => (
      <span style={{ fontSize: '15px', fontWeight: 300 }}>{title}</span>
    ),
  },
  {
    title: 'Дата',
    key: 'date',
    render: (_, record) => {
      const start = new Date(record.dateStart).toLocaleDateString('ru-RU');
      const end = new Date(record.dateEnd).toLocaleDateString('ru-RU');
      return <span style={{ fontSize: '15px' }}>{start} г. – {end} г.</span>;
    },
    width: '20%',
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
    width: '12%',
    render: (status) => (
      <Tag 
        color={status === 'PUBLISHED' ? 'green' : 'orange'}
        style={{
          borderRadius: '4px',
          padding: '2px 12px',
          fontSize: '15px',  // ← было 12px
        }}
      >
        {status === 'PUBLISHED' ? 'Опубликован' : 'Черновик'}
      </Tag>
    ),
  },
  {
    title: 'Доступ',
    dataIndex: 'accessLevel',
    key: 'accessLevel',
    width: '12%',
    render: (accessLevel) => (
      <Tag 
        color={accessLevel === 'PUBLIC' ? 'blue' : 'red'}
        style={{
          borderRadius: '4px',
          padding: '2px 12px',
          fontSize: '15px',  // ← было 12px
        }}
      >
        {accessLevel === 'PUBLIC' ? 'Публичный' : 'Ограниченный'}
      </Tag>
    ),
  },
  {
    title: 'Теги',
    dataIndex: 'tags',
    key: 'tags',
    width: '18%',
    render: (tags) => (
      <span>
        {tags?.map((tag: { id: number; name: string; color: string }) => (
          <Tag 
            key={tag.id} 
            style={{
              backgroundColor: 'transparent',
              color: '#000000',
              fontWeight: 500,
              border: '1px solid #d9d9d9',
              borderRadius: '4px',
              padding: '2px 12px',
              fontSize: '15px',  // ← было 12px
              marginBottom: 4,
              marginRight: 4
            }}
          >
            {tag.name}
          </Tag>
        ))}
      </span>
    ),
  },
];
  
  return (
    <Table 
      columns={columns} 
      dataSource={events} 
      loading={loading}
      rowKey="cardId"
      rowClassName={(record) => record.status === 'DRAFT' ? 'draft-row' : ''}
      pagination={{
        showSizeChanger: false,
        showQuickJumper: {
          goButton: false,
        },
        locale: {
          jump_to: 'Перейти к:',
          page: '',
        },
      }}
      onRow={(record) => ({
        onClick: () => handleRowClick(record.cardId),
        style: { cursor: 'pointer' }
      })}
      scroll={{ x: 700 }}
    />
  );
}