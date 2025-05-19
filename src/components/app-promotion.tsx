"use client";

import { useEffect, useState, useCallback } from "react";
import AppStoreButtons from "./app-store-btn";

export default function AppPromotion() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Use Intersection Observer to detect when component is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsVisible(entry.isIntersecting);
        }
      },
      { threshold: 0.1 },
    );

    const element = document.getElementById("app-promotion");
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Only animate when component is visible and not being hovered
  useEffect(() => {
    if (!isVisible || isHovering) return;

    const interval = setInterval(() => {
      setIsHovering((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, [isVisible, isHovering]);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => setIsHovering(false), []);

  return (
    <section
      id="app-promotion"
      className="bg-[#f0f5ff] border border-brand-blue lg:border-none rounded-xl overflow-visible relative my-16 lg:my-32 py-10 px-4 md:px-8 lg:px-12"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="region"
      aria-label="Mobile app promotion"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="max-w-lg space-y-1 lg:space-y-3">
          <h2 className="text-xl md:text-3xl font-bold text-brand-accent">
            Do more on the app.
          </h2>
          <p className="text-sm lg:text-base md:text-lg text-brand-muted">
            Save your searches, track enquiries and more.
          </p>
          <p className="text-sm lg:text-base md:text-base text-brand-accent">
            Available on iOS and Android
          </p>

          {/* App Store Button */}
          <AppStoreButtons />
        </div>

        <div
          className="absolute right-10 -top-24 h-[150px] md:h-[400px] overflow-visible hidden lg:block"
          aria-hidden="true"
        >
          {/* Featured Properties Phone */}
          <div
            className={`absolute right-10 lg:right-[-20px] top-[-30px] transform -rotate-6 z-10 transition-all duration-700 ease-in-out ${isHovering ? "translate-y-[-10px]" : "translate-y-[0px]"}`}
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          >
            <div
              className="relative w-[100px] lg:w-[220px] h-[200px] lg:h-[450px] bg-white rounded-xl lg:rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
              style={{
                boxShadow:
                  "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="absolute top-0 left-0 w-full h-full flex flex-col">
                <div className="bg-white p-3">
                  <div className="text-sm font-semibold text-brand-accent -rotate-[1deg] transform origin-top-left">
                    Featured Project Units -{" "}
                    <span className="text-brand-blue">See all</span>
                  </div>
                </div>
                <div className="flex-1 bg-gray-100 p-2">
                  <div className="bg-white rounded-lg overflow-hidden mb-3">
                    <div className="h-24 bg-gray-200"></div>
                    <div className="p-2">
                      <div className="h-2 bg-gray-200 rounded w-3/4 mb-1"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg overflow-hidden">
                    <div className="h-24 bg-gray-200"></div>
                    <div className="p-2">
                      <div className="h-2 bg-gray-200 rounded w-3/4 mb-1"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Phone reflection/shadow effect */}
            <div
              className="absolute bottom-[-15px] left-[10px] right-[10px] h-[20px] bg-black opacity-20 blur-md rounded-full transform -rotate-6"
              aria-hidden="true"
            ></div>
          </div>

          {/* Search Interface Phone */}
          <div
            className={`absolute right-[100px] top-[20px] transform rotate-6 z-0 transition-all duration-700 ease-in-out ${isHovering ? "translate-y-[-10px] delay-300" : "translate-y-[0px]"}`}
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          >
            <div
              className="relative w-[100px] lg:w-[220px] h-[200px] lg:h-[450px] bg-white rounded-xl lg:rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
              style={{
                boxShadow:
                  "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="absolute top-0 left-0 w-full h-full flex flex-col">
                <div className="bg-white p-3">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                </div>
                <div className="flex-1 bg-gray-100 p-2">
                  <div className="bg-white rounded-lg p-3 mb-3">
                    <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded mb-3"></div>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-6 bg-gray-200 rounded"></div>
                      </div>
                      <div>
                        <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
                        <div className="h-6 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="h-10 bg-[#ff6d84] rounded flex items-center justify-center">
                      <div className="h-3 bg-white rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Phone reflection/shadow effect */}
            <div
              className="absolute bottom-[-15px] left-[10px] right-[10px] h-[20px] bg-black opacity-20 blur-md rounded-full transform rotate-6"
              aria-hidden="true"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
