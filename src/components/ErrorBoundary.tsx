import React from "react";

export default class ErrorBoundary extends React.Component {
  state: { hasError: boolean };
  constructor(props: {}) {
    super(props);
    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }
  componentDidCatch(error: Error, errorInfo: {}) {
    console.error("error======", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
