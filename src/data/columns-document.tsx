import { Tag, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import type { TagItem } from '../interfaces/document_interfases/IDocumentGeneral';
import type { IDocument } from '../interfaces/document_interfases/IDocument';

const statusLabel: Record<string, string> = {
  PUBLISHED: 'Опубликован',
  DRAFT: 'Черновик',
};

export const columns: ColumnsType<IDocument> = [
  { title: 'Название', dataIndex: 'title', key: 'title' },
  { title: 'Тип', dataIndex: ['type', 'name'], key: 'type' },
  {
    title: 'Дата',
    dataIndex: 'docDate',
    key: 'docDate',
    render: (value: string) => (value ? dayjs(value).format('DD.MM.YYYY') : ''),
  },
  {
    title: 'Статус',
    dataIndex: 'status',
    key: 'status',
    render: (value: string) => statusLabel[value] || 'Неизвестно',
  },
  {
    title: 'Теги',
    dataIndex: 'tags',
    key: 'tags',
    render: (tags: TagItem[]) => (
      <Space wrap size={[0, 4]}>
        {tags?.map((tag) => (
          <Tag color={tag.color} key={tag.id}>
            {tag.name}
          </Tag>
        ))}
      </Space>
    ),
  },
];
