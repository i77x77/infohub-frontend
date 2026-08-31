import { Flex, Space, Tag, Typography, Button } from 'antd';
import { STATUS, ACCESS_LEVEL } from '../../data/constants-documentCard';

const { Title, Text } = Typography;

interface DocumentHeaderProps {
  title?: string;
  accessLevel?: keyof typeof ACCESS_LEVEL;
  status?: keyof typeof STATUS;
  onPublish?: () => void;
}

export function DocumentHeader({
  title,
  accessLevel,
  status,
  onPublish,
}: DocumentHeaderProps) {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Flex justify="space-between" align="center" style={{ width: '100%' }}>
        <Text type="secondary">Документы / {title}</Text>

        <Space wrap align="center">
          {accessLevel && ACCESS_LEVEL[accessLevel] && (
            <Tag>{ACCESS_LEVEL[accessLevel].title}</Tag>
          )}
          {status && STATUS[status] && <Tag>{STATUS[status].title}</Tag>}
          {status === 'DRAFT' && (
            <Button type="primary" onClick={onPublish}>
              Опубликовать
            </Button>
          )}
        </Space>
      </Flex>

      <Space align="center" wrap>
        <Tag color="blue">Документ</Tag>
        <Title level={2} style={{ margin: 0 }}>
          {title || 'Неизвестно'}
        </Title>
      </Space>
    </Space>
  );
}
