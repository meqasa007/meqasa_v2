"use client";

import * as React from "react";
import Link from "next/link";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

interface ErrorCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  retryLink?: string;
  retryLinkText?: string;
  reset?: () => void;
}

export function ErrorCard({
  icon: Icon = ExclamationTriangleIcon,
  title,
  description,
  retryLink,
  retryLinkText = "Go back",
  reset,
  className,
  ...props
}: ErrorCardProps) {
  return (
    <Card
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={cn(
        "flex w-full min-w-0 text-brand-accent rounded-lg flex-col items-center justify-center overflow-hidden p-10",
        className
      )}
      {...props}
    >
      <div className="grid place-items-center rounded-full border border-dashed border-rose-300/75 p-6">
        <Icon className="size-8 text-rose-500/75" aria-hidden="true" />
      </div>
      <div className="flex flex-col items-center justify-center space-y-1.5 py-14 text-center">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="line-clamp-4 text-brand-muted ">
          {description}
        </CardDescription>
      </div>
      <div className="flex flex-nowrap items-center h-full justify-center gap-8 text-center">
        {reset ? (
          <Button aria-label="Retry" variant="outline" onClick={reset}>
            Retry
          </Button>
        ) : null}
        {retryLink ? (
          <Link
            href={retryLink}
            className={cn(
              buttonVariants({
                variant: "default",
              }),
              "bg-brand-accent text-white"
            )}
          >
            {retryLinkText}
            <span className="sr-only">{retryLinkText}</span>
          </Link>
        ) : null}
      </div>
    </Card>
  );
}
