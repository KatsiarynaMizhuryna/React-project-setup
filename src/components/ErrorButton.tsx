import { Component } from 'react';

interface ErrorButtonState {
  hasError: boolean;
}

class ErrorButton extends Component<object, ErrorButtonState> {
  state: ErrorButtonState = {
    hasError: false,
  };

  handleClick = () => {
    this.setState({ hasError: true });
  };

  render() {
    const { hasError } = this.state;

    if (hasError) {
      throw new Error('Error...');
    }

    return (
      <button className="error-button" onClick={this.handleClick}>
        Trigger Error
      </button>
    );
  }
}

export default ErrorButton;
