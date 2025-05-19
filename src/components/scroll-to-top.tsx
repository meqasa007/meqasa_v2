"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronUp } from "lucide-react";

export default function ScrollTotop() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {/* Back to top button */}
      {showScrollButton && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 size-12 rounded-full bg-[#f93a5d] hover:bg-[#f93a5d]/80 text-white shadow-lg z-50 p-0 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ChevronUp className="size-6" />
        </Button>
      )}
    </>
  );
}
