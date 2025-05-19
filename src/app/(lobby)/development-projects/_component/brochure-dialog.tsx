"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";

interface BrochureDialogProps {
  trigger?: React.ReactNode;
  className?: string;
  showIcon?: boolean;
}

export default function BrochureDialog({
  trigger,
  className,
  showIcon = false,
}: BrochureDialogProps) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle brochure request submission
    console.log("Brochure requested for:", email);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? (
          <Button className={className} variant="default">
            {showIcon && <FileText className="w-4 h-4 mr-2" />}
            Get Brochure
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-brand-accent">
              Brochure Request
            </DialogTitle>
            <DialogDescription className="text-brand-muted">
              Enter email to get brochure. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="items-center">
              <Label htmlFor="email" className="mb-4 block text-brand-accent">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="bg-brand-primary">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
