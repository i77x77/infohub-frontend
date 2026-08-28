import { Table } from 'antd';
import type { EventListItem } from '../../types/types';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getColumns } from './columns';
import '../../styles/components/EventsPage.css';

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

  const columns = getColumns();

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