import { Alert, Layout, Space, Spin } from 'antd';
import { useParams } from 'react-router-dom';

import { useDocumentById } from '../../hooks/document_hooks/useDocumentById';
import { DocumentHeader } from './DocumentCardHeader';
import { DocumentDetailsCard } from './DocumentCardDetails';
import { DocumentFileCard } from './DocumentCardFile';

function DocumentCard() {
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useDocumentById(id);

  const handlePublish = () => {
    // Заглушка для публикации
  };

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message="Ошибка" description={error} type="error" />;
  if (!data) return <Alert message="Документ не найден" type="warning" />;

  return (
    <Layout>
      <Space direction="vertical" style={{ margin: 24, gap: 16 }}>
        <DocumentHeader
          title={data.title}
          accessLevel={data.accessLevel}
          status={data.status}
          onPublish={handlePublish}
        />

        <DocumentDetailsCard data={data} onPublish={handlePublish} />

        {data.file && <DocumentFileCard file={data.file} />}
      </Space>
    </Layout>
  );
}

export default DocumentCard;
