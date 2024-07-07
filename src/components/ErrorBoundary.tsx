import { Component, ReactNode } from 'react';
import errorImg from '../assets/error.png';

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Something went wrong... Refresh this page</h1>
          <img className="image" src={errorImg} alt="error" />
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
