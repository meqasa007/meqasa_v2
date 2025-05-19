"use client";

import * as React from "react";
import { Slider } from "@/components/ui/slider";
import { type ClassValue } from "clsx";
import { cn } from "@/lib/utils";

const SliderTenure = React.forwardRef<
  React.ElementRef<typeof Slider>,
  React.ComponentPropsWithoutRef<typeof Slider>
>(({ className, ...props }, ref) => (
  <Slider
    ref={ref}
    className={cn("w-full", className as ClassValue)}
    {...props}
  />
));

SliderTenure.displayName = "SliderTenure";

export { SliderTenure };
