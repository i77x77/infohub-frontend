import {
  Card,
  Alert,
  Descriptions,
  Tag,
  Typography,
  Space,
  Flex,
  Button,
} from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { STATUS } from '../../data/constants-documentCard';
import type { IDocumentCard } from '../../interfaces/document_interfases/IDocumentCard';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';

dayjs.locale('ru');

const { Title, Text, Link, Paragraph } = Typography;
const { Item } = Descriptions;

interface DocumentDetailsCardProps {
  data: IDocumentCard;
  onPublish?: () => void;
}

export function DocumentDetailsCard({
  data,
  onPublish,
}: DocumentDetailsCardProps) {
  const statusConfig = data.status
    ? STATUS[data.status as keyof typeof STATUS]
    : null;

  return (
    <Card>
      {statusConfig && (
        <Alert
          message={
            <Text
              strong
              style={{
                color: statusConfig.type === 'info' ? '#1677ff' : undefined,
              }}
              type={statusConfig.type === 'warning' ? 'warning' : undefined}
            >
              {statusConfig.title ?? 'Нестандартный статус'}
            </Text>
          }
          description={statusConfig.desc ?? ''}
          type={statusConfig.type ?? 'info'}
          showIcon
          icon={<FormOutlined />}
          style={{ padding: 16 }}
          action={
            data.status === 'DRAFT' ? (
              <Button type="primary" onClick={onPublish}>
                Опубликовать
              </Button>
            ) : null
          }
        />
      )}

      <Title level={5} style={{ marginTop: statusConfig ? 16 : 0 }}>
        Главная информация
      </Title>

      <Descriptions
        column={2}
        style={{ padding: 8 }}
        contentStyle={{ textAlign: 'right' }}
      >
        <Item label="Тип документа">{data.type?.name || '-'}</Item>
        <Item label="Автор">{data.author?.fullName || '-'}</Item>
        <Item label="Формат">{data.file?.format || '-'}</Item>
        <Item label="Дата публикации">
          {data?.publishedAt
            ? dayjs(data.publishedAt).format('DD MMMM YYYY [г.]')
            : '-'}
        </Item>

        <Item label="Размер файла">
          {data.file?.sizeBytes
            ? `${(data.file.sizeBytes / (1024 * 1024)).toFixed(2)} MБ`
            : '-'}
        </Item>
        <Item label="Ссылка на ЭДО">
          {data.edmsUrl ? (
            <Link href={data.edmsUrl} target="_blank">
              {data.edmsUrl}
            </Link>
          ) : (
            '-'
          )}
        </Item>
      </Descriptions>

      {data.tags && data.tags.length > 0 && (
        <div
          style={{
            borderTop: '1px solid #f0f0f0',
            borderBottom: '1px solid #f0f0f0',
            padding: '16px 16px',
            margin: '16px 0px',
          }}
        >
          <Flex align="center" gap={8}>
            <Text type="secondary">Тэги:</Text>
            <Space wrap>
              {data.tags.map((tag: { id: string | number; name: string }) => (
                <Tag key={tag.id}>{tag.name}</Tag>
              ))}
            </Space>
          </Flex>
        </div>
      )}

      <Paragraph>
        <Text strong>Описание: </Text>
        {data.description || '...'}
      </Paragraph>
    </Card>
  );
}
