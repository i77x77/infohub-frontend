import { Outlet, useLocation } from 'react-router-dom';
import { Menu, Layout } from 'antd';
import { menuItems } from '../data/menu';

const { Sider, Content } = Layout;

function MainLayout() {
  const location = useLocation();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={100} theme="light">
        <Menu
          mode="inline"
          inlineCollapsed={true}
          items={menuItems}
          selectedKeys={[location.pathname]}
          style={{ height: '100%', borderRight: 0 }}
        />
      </Sider>

      <Content style={{ padding: '24px', background: '#f5f5f5' }}>
        {/* Здесь рендерится контент страницы */}
        <Outlet />
      </Content>
    </Layout>
  );
}

export default MainLayout;
