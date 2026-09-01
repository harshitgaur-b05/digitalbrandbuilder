"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight, RefreshCw } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to your error tracking service here if needed
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6 antialiased">
      <div className="max-w-xl w-full text-center">
        <span className="text-xs font-bold tracking-[0.2em] text-primary uppercase mb-4 block">
          Something went wrong
        </span>

        <h1 className="font-sans text-3xl md:text-5xl font-medium tracking-tight text-foreground mb-4 leading-tight">
          An unexpected error occurred.
        </h1>

        <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-10 max-w-md mx-auto">
          We&apos;ve been notified and are looking into it. Please try again or return to
          the homepage.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 bg-foreground text-background px-8 py-4 rounded-full text-sm font-medium hover:bg-primary transition-colors duration-300 group"
          >
            <RefreshCw size={16} className="transition-transform duration-300 group-hover:rotate-180" />
            Try Again
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded-full text-sm font-medium hover:border-primary hover:bg-primary/5 transition-colors duration-300 group"
          >
            Back to Homepage
            <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
