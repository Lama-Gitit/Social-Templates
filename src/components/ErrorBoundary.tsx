import { Component, type ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error('ErrorBoundary caught:', error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-background flex items-center justify-center p-8">
                    <div className="max-w-md text-center space-y-6">
                        <div className="w-16 h-16 mx-auto bg-card border border-border/40 rounded-sm flex items-center justify-center text-primary/60">
                            <span className="text-2xl font-black">!</span>
                        </div>
                        <h1 className="text-2xl font-black text-white uppercase tracking-tighter">
                            Something went wrong
                        </h1>
                        <p className="text-[10px] text-white/40 uppercase tracking-widest">
                            {this.state.error?.message || 'An unexpected error occurred.'}
                        </p>
                        <button
                            onClick={() => this.setState({ hasError: false, error: null })}
                            className="px-8 py-3 bg-primary text-white font-black uppercase tracking-[0.4em] text-[10px] rounded-sm transition-all hover:bg-primary/90"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
