"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ImprovedAppPromotion() {
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Add a subtle floating animation effect when component mounts
    const interval = setInterval(() => {
      setIsHovering((prev) => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="bg-[#f0f5ff] py-16 px-4 md:px-8 lg:px-16 rounded-xl overflow-hidden relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="max-w-lg">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1e2b5c] mb-4">
            Do more on the app.
          </h2>
          <p className="text-lg md:text-xl text-[#1e2b5c] mb-2">
            Save your searches, track enquiries and more.
          </p>
          <p className="text-lg md:text-xl text-[#1e2b5c] mb-8">
            Available on iOS and Android
          </p>

          <div className="flex flex-wrap gap-4">
            {/* App Store Button */}
            <Link href="#" className="inline-block">
              <div className="bg-black text-white rounded-lg flex items-center justify-center px-4 py-2 w-[200px] h-[60px]">
                <div className="mr-3">
                  <svg
                    viewBox="0 0 24 24"
                    width="30"
                    height="30"
                    fill="currentColor"
                  >
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                  </svg>
                </div>
                <div>
                  <div className="text-xs">Download on the</div>
                  <div className="text-xl font-semibold">App Store</div>
                </div>
              </div>
            </Link>

            {/* Google Play Button */}
            <Link href="#" className="inline-block">
              <div className="bg-black text-white rounded-lg flex items-center justify-center px-4 py-2 w-[200px] h-[60px]">
                <div className="mr-3">
                  <svg viewBox="0 0 512 512" width="30" height="30">
                    <path
                      d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1z"
                      fill="#EA4335"
                    />
                    <path
                      d="M104.6 13A227 227 0 0 0 13 104.6l182.7 182.7 60.1-60.1L104.6 13z"
                      fill="#FBBC04"
                    />
                    <path
                      d="M13 104.6A227 227 0 0 0 13 407.4l182.7-182.7L13 104.6z"
                      fill="#34A853"
                    />
                    <path
                      d="M13 407.4A227 227 0 0 0 104.6 499l280.8-280.8-60.1-60.1L13 407.4z"
                      fill="#4285F4"
                    />
                    <path
                      d="M104.6 499A227 227 0 0 0 385.4 499L325.3 277.6l-60.1 60.1L104.6 499z"
                      fill="#EA4335"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs">GET IT ON</div>
                  <div className="text-xl font-semibold">Google Play</div>
                </div>
              </div>
            </Link>
          </div>
        </div>

        <div className="relative h-[400px] md:h-[500px] overflow-visible">
          {/* Featured Properties Phone */}
          <div
            className={`absolute right-[-20px] top-[-30px] transform -rotate-6 z-10 transition-all duration-700 ${isHovering ? "translate-y-[-10px]" : "translate-y-[0px]"}`}
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          >
            <div
              className="relative w-[220px] h-[450px] bg-white rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
              style={{
                boxShadow:
                  "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 15px rgba(0, 0, 0, 0.1)",
              }}
            >
              <div className="absolute top-0 left-0 w-full h-full flex flex-col">
                <div className="bg-white p-3">
                  <div className="text-sm font-semibold text-gray-800 rotate-[6deg] transform origin-top-left">
                    Featured Projects
                    <span className="text-blue-500">See all</span>
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
            <div className="absolute bottom-[-15px] left-[10px] right-[10px] h-[20px] bg-black opacity-20 blur-md rounded-full transform -rotate-6"></div>
          </div>

          {/* Search Interface Phone */}
          <div
            className={`absolute right-[100px] top-[20px] transform rotate-6 z-0 transition-all duration-700 ${isHovering ? "translate-y-[-10px] delay-300" : "translate-y-[0px]"}`}
            style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
          >
            <div
              className="relative w-[220px] h-[450px] bg-white rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
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
                    <div className="h-10 bg-red-500 rounded flex items-center justify-center">
                      <div className="h-3 bg-white rounded w-1/3"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Phone reflection/shadow effect */}
            <div className="absolute bottom-[-15px] left-[10px] right-[10px] h-[20px] bg-black opacity-20 blur-md rounded-full transform rotate-6"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
