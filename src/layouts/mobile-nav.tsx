"use client";

import * as React from "react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import type { MainNavItem } from "@/types";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Icons } from "@/components/icons";

interface MobileNavProps {
  items?: MainNavItem[];
}

export function MobileNav({ items }: MobileNavProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const segment = useSelectedLayoutSegment();
  const [open, setOpen] = React.useState(false);
  const memoizedItems = React.useMemo(() => items, [items]);

  if (isDesktop) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-7 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          <Icons.menu aria-hidden="true" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="pl-1 pr-0 pt-9"
        id="mobile-nav"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className="w-full px-7">
          <Link
            href="/"
            className="flex items-center"
            onClick={() => setOpen(false)}
            aria-label="Home"
          >
            <Icons.logo
              className="mr-2 size-6 text-[#f93a5d]"
              aria-hidden="true"
            />
            <span className="font-bold text-accent-foreground">
              {siteConfig.name}
            </span>
            <span className="sr-only">Home</span>
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="pl-1 pr-7">
            <Accordion type="multiple" className="w-full">
              {memoizedItems?.map((item, index) =>
                item.items && item.items.length !== 0 ? (
                  <AccordionItem value={item.title} key={index}>
                    <AccordionTrigger
                      className="text-sm capitalize text-accent-foreground"
                      aria-label={`${item.title} menu`}
                    >
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2">
                        {item.items.map((subItem, subIndex) =>
                          subItem.href ? (
                            <MobileLink
                              key={subIndex}
                              href={String(subItem.href)}
                              segment={String(segment)}
                              setOpen={setOpen}
                              className="m-1"
                            >
                              {subItem.title}
                            </MobileLink>
                          ) : (
                            <div
                              key={subIndex}
                              className="text-foreground/70 transition-colors"
                            >
                              {subItem.title}
                            </div>
                          ),
                        )}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ) : null,
              )}
            </Accordion>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  disabled?: boolean;
  segment: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function MobileLink({
  children,
  href,
  disabled,
  segment,
  setOpen,
  className,
  ...props
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        href.includes(segment) && "text-foreground",
        disabled && "pointer-events-none opacity-60",
        className,
      )}
      onClick={() => setOpen(false)}
      {...props}
    >
      {children}
    </Link>
  );
}
