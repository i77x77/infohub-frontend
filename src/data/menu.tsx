import { Link } from 'react-router-dom';
import type { MenuProps } from 'antd';
import { CopyOutlined, FireTwoTone, FileTextOutlined } from '@ant-design/icons';

export type MenuItem = Required<MenuProps>['items'][number];

export const menuItems: MenuItem[] = [
  {
    key: '/home',
    icon: <CopyOutlined />,
    label: <Link to="/">Главная</Link>,
  },
  {
    key: '/documents',
    icon: <FileTextOutlined />,
    label: <Link to="/documents">Документы</Link>,
  },
  {
    key: '/events',
    icon: <FireTwoTone />,
    label: <Link to="/events">События</Link>,
  },
];
