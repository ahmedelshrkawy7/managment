import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: ''
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error.message || 'An error occurred'
    };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error or send it to an error tracking service
    console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render a fallback UI here
      return <div>Error: {this.state.errorMessage}</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;