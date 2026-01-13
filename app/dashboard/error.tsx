"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-[60vh] flex flex-col items-center justify-center text-center p-8">
      <div className="bg-red-50 p-4 rounded-full mb-6">
        <AlertTriangle className="h-12 w-12 text-red-500" />
      </div>
      <h2 className="text-2xl font-bold text-zinc-900 mb-2">System Malfunction</h2>
      <p className="text-zinc-500 max-w-md mb-8">
        The forensic engine encountered a critical error. Our team has been notified.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => window.location.href = '/'} variant="outline">
          Return to Base
        </Button>
        <Button onClick={() => reset()} className="bg-indigo-600 hover:bg-indigo-700">
          <RefreshCcw className="mr-2 h-4 w-4" /> Retry Process
        </Button>
      </div>
    </div>
  );
}
