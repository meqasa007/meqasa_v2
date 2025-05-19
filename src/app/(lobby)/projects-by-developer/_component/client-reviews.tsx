"use client";

import * as React from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "@/components/icons";

const slides = Array.from({ length: 8 }).map((_, index) => (
  <CarouselItem className="basis-[320px]" key={index}>
    <ReviewCard />
  </CarouselItem>
));

export default function ClientReviews() {
  return (
    <>
      <Carousel className="w-full max-w-3xl">
        <CarouselContent>{slides}</CarouselContent>
        <CarouselPrevious
          className="left-4 hidden h-12 w-12 bg-white lg:flex"
          aria-label="Previous Slide"
        />
        <CarouselNext
          className="right-4 hidden h-12 w-12 bg-white lg:flex"
          aria-label="Next Slide"
        />
      </Carousel>
    </>
  );
}

function ReviewCard() {
  return (
    <div className="md:my-6">
      <Dialog>
        <DialogTrigger asChild>
          <Card className="h-full w-[300px] cursor-pointer rounded-xl border p-4 transition md:hover:-translate-y-3">
            <CardContent className="p-0">
              <p className="line-clamp-5 text-sm text-b-accent">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Molestias, eaque ab doloremque consequatur quaerat at laborum
                laudantium totam illum veritatis vel consequuntur vero,
                obcaecati deserunt mollitia culpa quos labore! Voluptatum.
              </p>
            </CardContent>
            <CardFooter className="mt-4 p-0">
              <span className="flex items-center gap-2">
                <span>
                  <Avatar className="flex h-[35px] w-[35px] items-center rounded-full text-b-accent shadow-spread">
                    <AvatarImage
                      src="https://xsgames.co/randomusers/avatar.php?g=female"
                      className="rounded-full object-cover"
                    />
                    <AvatarFallback className="flex h-[35px] w-[35px] items-center justify-center rounded-full border bg-slate-50 text-sm font-bold text-inherit">
                      WD
                    </AvatarFallback>
                  </Avatar>
                </span>
                <span>
                  <span className="font-semibold capitalize text-b-accent">
                    William
                  </span>
                  <small className="flex items-center text-blue-500">
                    Posted <Icons.dot className="h-4 w-4" />a day ago
                  </small>
                </span>
              </span>
            </CardFooter>
          </Card>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" aria-describedby="modal-content">
          <DialogTitle className="sr-only">Review</DialogTitle>
          <div className="">
            <div className="p-0">
              <p className="line-clamp-5 text-sm text-b-accent">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Molestias, eaque ab doloremque consequatur quaerat at laborum
                laudantium totam illum veritatis vel consequuntur vero,
                obcaecati deserunt mollitia culpa quos labore! Voluptatum.
              </p>
            </div>
            <div className="mt-4 p-0">
              <span className="flex items-center gap-2">
                <span>
                  <Avatar className="flex h-[35px] w-[35px] items-center rounded-full text-b-accent shadow-spread">
                    <AvatarImage
                      src="https://xsgames.co/randomusers/avatar.php?g=female"
                      className="rounded-full object-cover"
                      loading="lazy" // Add lazy loading
                    />
                    <AvatarFallback className="flex h-[35px] w-[35px] items-center justify-center rounded-full border bg-slate-50 text-sm font-bold text-inherit">
                      WD
                    </AvatarFallback>
                  </Avatar>
                </span>
                <span>
                  <span className="font-semibold capitalize text-b-accent">
                    William
                  </span>
                  <small className="flex items-center text-blue-500">
                    Posted <Icons.dot className="h-4 w-4" />a day ago
                  </small>
                </span>
              </span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
