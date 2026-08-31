import { Card, Flex, Space, Button, Typography } from 'antd';
import { PaperClipOutlined, DownloadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

interface DocumentFileCardProps {
  file: {
    originalName: string;
    downloadUrl: string;
  };
}

export function DocumentFileCard({ file }: DocumentFileCardProps) {
  return (
    <Card>
      <Title level={5} style={{ margin: 0, paddingBottom: 16 }}>
        Файл
      </Title>
      <Card
        size="small"
        style={{ backgroundColor: '#f5f5f5' }}
        styles={{ body: { padding: 8 } }}
      >
        <Flex justify="space-between" align="center">
          <Space
            style={{
              color: '#1677ff',
              overflow: 'hidden',
              paddingLeft: 16,
            }}
          >
            <PaperClipOutlined />
            <Text
              style={{ color: 'inherit' }}
              ellipsis={{ tooltip: file.originalName }}
            >
              {file.originalName}
            </Text>
          </Space>

          <Button
            type="link"
            ghost
            icon={<DownloadOutlined />}
            href={file.downloadUrl}
            target="_blank"
            style={{ paddingRight: 16 }}
          >
            Скачать
          </Button>
        </Flex>
      </Card>
    </Card>
  );
}
