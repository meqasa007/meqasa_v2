"use client";
import { ErrorCard } from "@/components/error-card";
import Shell from "@/layouts/shell";
import React from "react";

export default function Error() {
  return (
    <Shell>
      <div className="max-w-md mx-auto my-20">
        <ErrorCard
          title="Property listing not found"
          description="The property listing may have expired or you may have been removed"
          retryLink="/"
          retryLinkText="Go to Home"
        />
      </div>
    </Shell>
  );
}
