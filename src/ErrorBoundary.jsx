import { Component } from "react";
import { Link } from "@tanstack/react-router";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error Boundary telah menangkap sebuah error", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Astaga, ketemu error nih!</h2>
          <p>
            Silahkan kembali ke home dengan <Link to={"/"}>link ini</Link>
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
