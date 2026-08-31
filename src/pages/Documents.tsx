import { Typography, Statistic, Table, Space, Layout, Flex } from 'antd';
import { columns } from '../data/columns-document';
import { useDocuments } from '../hooks/document_hooks/useDocuments';
import {
  SearchBarDebounce,
  SearchBarEnter,
} from '../components/search_bar/SearchBar'; // Поиск реализован двумя спосабами, первый это поиск чеерез таймер, второй по кнопке

import { useNavigate, useSearchParams } from 'react-router-dom';

const { Title, Text } = Typography;

function Documents() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || '';
  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;

  const { data, loading /*,  error */ } = useDocuments(search);

  const handleSearch = (newSearch: string) => {
    setSearchParams((prev) => {
      if (newSearch) {
        prev.set('search', newSearch);
      } else {
        prev.delete('search');
      }
      prev.set('page', '1');
      return prev;
    });
  };

  const handleTableChange = (pagination: any) => {
    setSearchParams((prev) => {
      prev.set('page', String(pagination.current));
      prev.set('pageSize', String(pagination.pageSize));
      return prev;
    });
  };

  return (
    <Layout>
      <Space direction="vertical" style={{ margin: 24, gap: 16 }}>
        {/* Заголовок страницы */}
        <Space direction="vertical" style={{ width: '100%' }}>
          <Title level={2} style={{ margin: 0 }}>
            Документы
          </Title>
          <Text type="secondary">Удобное управление документами</Text>
        </Space>

        {/* Блок поиска и статистики */}
        <Space direction="vertical" style={{ width: '100%' }}>
          <Flex justify="space-between" align="center" wrap gap="middle">
            <SearchBarDebounce value={search} onSearch={handleSearch} />
            {/* <SearchBarEnter value={search} onSearch={handleSearch} /> */}

            <Statistic
              title="Всего документов:"
              value={data?.length ?? 0}
              loading={loading}
              valueStyle={{
                fontSize: '14px',
                fontWeight: 'normal',
                color: 'inherit',
              }}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '8px',
              }}
            />
          </Flex>
        </Space>

        {/* Таблица */}
        <Space direction="vertical" style={{ width: '100%' }}>
          <Table
            size="small"
            dataSource={data}
            columns={columns}
            rowKey="cardId"
            loading={loading}
            pagination={{
              current: page,
              pageSize: pageSize,
              showSizeChanger: true,
            }}
            onChange={handleTableChange}
            onRow={(record) => ({
              onClick: () => {
                navigate(`/documents/${record.cardId}`);
              },
              style: { cursor: 'pointer' },
            })}
          />
        </Space>
      </Space>
    </Layout>
  );
}

export default Documents;
