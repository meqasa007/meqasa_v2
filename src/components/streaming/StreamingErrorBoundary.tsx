"use client";

import React, { Suspense } from "react";
import { AlertCard } from "@/components/alert-card";
import { AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Shell from "@/layouts/shell";

interface StreamingErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  onRetry?: () => void;
}

// Error boundary component for streaming content
class StreamingErrorBoundaryClass extends React.Component<
  {
    children: React.ReactNode;
    errorFallback?: React.ReactNode;
    onRetry?: () => void;
  },
  { hasError: boolean; error?: Error; isRetrying: boolean }
> {
  constructor(props: {
    children: React.ReactNode;
    errorFallback?: React.ReactNode;
    onRetry?: () => void;
  }) {
    super(props);
    this.state = { hasError: false, isRetrying: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Streaming component error:", error, errorInfo);

    // Production error tracking (you can replace with your preferred service)
    if (typeof window !== "undefined") {
      // Send to error tracking service (Sentry, LogRocket, etc.)
      // analytics.track('component_error', {
      //   component: 'StreamingGridBanner',
      //   error: error.message,
      //   stack: error.stack,
      //   errorInfo
      // });
    }
  }

  handleRetry = () => {
    this.setState({ isRetrying: true });

    if (this.props.onRetry) {
      // Call the parent's retry function
      this.props.onRetry();
    } else {
      // Default retry behavior: reload the page
      window.location.reload();
    }
    // Reset the error state
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.errorFallback) {
        return this.props.errorFallback;
      }

      // Default error UI
      return (
        <Shell className="hidden lg:block">
          <AlertCard variant="destructive">
            <div className="flex flex-col items-center space-y-2 text-center">
              <AlertTitle className="text-lg text-brand-accent">
                Content Loading Error
              </AlertTitle>
              <AlertDescription className="text-brand-muted">
                Unable to load content. Please try again later.
              </AlertDescription>
              <Button
                onClick={this.handleRetry}
                variant="outline"
                className="mt-4"
                disabled={this.state.isRetrying}
              >
                {this.state.isRetrying ? "Retrying..." : "Try Again"}
              </Button>
            </div>
          </AlertCard>
        </Shell>
      );
    }

    return this.props.children;
  }
}

// Enhanced wrapper that combines Suspense with error boundaries
export function StreamingErrorBoundary({
  children,
  fallback,
  errorFallback,
  onRetry,
}: StreamingErrorBoundaryProps) {
  return (
    <StreamingErrorBoundaryClass
      errorFallback={errorFallback}
      onRetry={onRetry}
    >
      <Suspense fallback={fallback}>{children}</Suspense>
    </StreamingErrorBoundaryClass>
  );
}
