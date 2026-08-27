import { Button } from 'antd';
import { WarningOutlined } from '@ant-design/icons';

export default function DraftBanner() {
  return (
    <div className="draftBanner">
      <div className="draftBannerContent">
        <WarningOutlined className="draftIcon" />
        <div>
          <div className="draftTitle">Черновик</div>
          <div className="draftSubtitle">
            Опубликуйте карточку, чтобы она стала доступна пользователям{' '}
            <a href="#" className="draftLink">для чтения</a>
          </div>
        </div>
      </div>
      <Button type="primary">Опубликовать</Button>
    </div>
  );
}