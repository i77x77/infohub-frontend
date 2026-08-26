import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { EventListItem } from '../types/types';
import { useNavigate, useSearchParams } from 'react-router-dom';

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
      width: 150,
    },
    {
      title: 'Название',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Дата',
      key: 'date',
      render: (_, record) => {
        const start = new Date(record.dateStart).toLocaleDateString('ru-RU');
        const end = new Date(record.dateEnd).toLocaleDateString('ru-RU');
        return `${start} г. – ${end} г.`;
      },
      width: 250,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 'PUBLISHED' ? 'green' : 'orange'}>
          {status === 'PUBLISHED' ? 'Опубликован' : 'Черновик'}
        </Tag>
      ),
      width: 120,
    },
    {
      title: 'Доступ',
      dataIndex: 'accessLevel',
      key: 'accessLevel',
      render: (accessLevel) => (
        <Tag color={accessLevel === 'PUBLIC' ? 'blue' : 'red'}>
          {accessLevel === 'PUBLIC' ? 'Публичный' : 'Ограниченный'}
        </Tag>
      ),
      width: 120,
    },
    {
      title: 'Теги',
      dataIndex: 'tags',
      key: 'tags',
      render: (tags) => (
        <span>
          {tags?.map((tag: { id: number; name: string; color: string }) => (
            <Tag 
              key={tag.id} 
              style={{ 
                backgroundColor: tag.color || '#f0f0f0',
                color: '#000000',
                border: '1px solid #d9d9d9',
                marginBottom: 4
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
      pagination={{
        showSizeChanger: false,
        showQuickJumper: {
          goButton: false,
        },
        locale: {
          jump_to: 'Перейти к',
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