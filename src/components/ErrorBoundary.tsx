import { Component, type ReactNode } from 'react';
import { Button, Result } from 'antd';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: 48, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh' 
        }}>
          <Result
            status="error"
            title="Упс! Что-то пошло не так"
            subTitle={this.state.error?.message || 'Произошла ошибка при загрузке страницы. Попробуйте обновить.'}
            extra={[
              <Button type="primary" key="retry" onClick={this.handleRetry}>
                Обновить страницу
              </Button>,
            ]}
          />
        </div>
      );
    }

    return this.props.children;
  }
}