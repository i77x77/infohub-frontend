import { Layout, Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { DatabaseOutlined, CalendarOutlined, FileOutlined } from '@ant-design/icons';

const { Sider, Content } = Layout;

function MainLayout() {
  const navigate = useNavigate();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider 
        width={72} 
        style={{ 
          background: '#FFFFFF', 
          borderRight: '1px solid #D9D9D9',
          paddingTop: 24,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Menu
          mode="inline"
          defaultSelectedKeys={['events']}
          style={{ borderRight: 0, background: 'transparent' }}
          items={[
            {
              key: 'home',
              icon: <DatabaseOutlined style={{ fontSize: 20 }} />,
              label: '',
              onClick: () => navigate('/'),
            },
            {
              key: 'events',
              icon: <CalendarOutlined style={{ fontSize: 20 }} />,
              label: '',
              onClick: () => navigate('/events'),
            },
            {
              key: 'documents',
              icon: <FileOutlined style={{ fontSize: 20 }} />,
              label: '',
              onClick: () => navigate('/documents'),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Content style={{ padding: 24, background: '#F5F5F5' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
