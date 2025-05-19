"use client";

import { useState } from "react";
import { Grid3x3, Bed } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import type { FloorPlan } from "@/types";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

const FLOOR_PLANS = [
  {
    id: "B6aDP",
    sqft: 1012,
    sqm: 94,
    beds: 1,
    baths: 1,
    type: "1BS",
    title: "1-BEDROOM + STUDY",
    imageUrl: "/placeholder.svg?height=400&width=500",
    unitNumbers: "#03-03 to #24-03",
  },
  {
    id: "B6aDP",
    sqft: 1012,
    sqm: 94,
    beds: 2,
    baths: 1,
    type: "2B",
    title: "2-BEDROOM",
    imageUrl: "/placeholder.svg?height=400&width=500",
    unitNumbers: "#03-03 to #24-03",
  },
  {
    id: "B6aDP",
    sqft: 1012,
    sqm: 94,
    beds: 3,
    baths: 3,
    type: "3B",
    title: "3-BEDROOM",
    imageUrl: "/placeholder.svg?height=400&width=500",
    unitNumbers: "#03-03 to #24-03",
  },
  {
    id: "B6aDP",
    sqft: 1012,
    sqm: 94,
    beds: 4,
    baths: 4,
    type: "4B",
    title: "4-BEDROOM",
    imageUrl: "/placeholder.svg?height=400&width=500",
    unitNumbers: "#03-03 to #24-03",
  },
  {
    id: "B6aDP",
    sqft: 1012,
    sqm: 94,
    beds: 2,
    baths: 2,
    type: "2B2B",
    title: "2-BEDROOM + 2 BATH",
    imageUrl: "/placeholder.svg?height=400&width=500",
    unitNumbers: "#03-03 to #24-03",
  },
] satisfies FloorPlan[];

export default function FloorPlans() {
  const [selectedPlan, setSelectedPlan] = useState<number>(0);
  const selectedFloorPlan = FLOOR_PLANS[selectedPlan];

  return (
    <div>
      {/* <h1 className="text-3xl font-bold text-[#1a2b5e] mb-8">
        Floor Plans For One Elm
      </h1> */}

      <Card className="overflow-hidden p-0">
        <Tabs defaultValue="type" className="w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-none h-auto">
            <TabsTrigger
              value="type"
              className="flex flex-col items-center py-4 data-[state=active]:text-blue-500"
            >
              <div className="border rounded p-1 mb-1 data-[state=active]:border-blue-500 data-[state=inactive]:border-gray-300">
                <Grid3x3 className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">By type</span>
            </TabsTrigger>
            <TabsTrigger
              value="bed"
              className="flex flex-col items-center py-4 data-[state=active]:text-blue-500"
            >
              <div className="border rounded p-1 mb-1 data-[state=active]:border-blue-500 data-[state=inactive]:border-gray-300">
                <Bed className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium">By bed</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="type" className="m-0">
            <div className="grid md:grid-cols-[1fr_1.5fr]">
              {/* Floor plan list */}
              <div className="border-r">
                {FLOOR_PLANS.map((plan, index) => (
                  <Button
                    key={`${plan.id}-${index}`}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start border-b rounded-none p-6 h-auto text-left",
                      selectedPlan === index ? "bg-gray-50" : "",
                    )}
                    onClick={() => setSelectedPlan(index)}
                  >
                    <div>
                      <h3 className="text-[#1a2b5e] font-bold text-lg">
                        {plan.id}
                      </h3>
                      <p className="text-[#1a2b5e] font-bold">
                        {plan.sqft} sqft / {plan.sqm} sqm
                      </p>
                      <p className="text-gray-500 mt-1">
                        {plan.beds} Beds • {plan.baths} Baths
                      </p>
                    </div>
                  </Button>
                ))}
              </div>

              {/* Floor plan details */}
              <div className="p-8">
                {selectedFloorPlan && (
                  <>
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="border-l-4 border-[#a8c7c3] h-10"></div>
                        <div>
                          <h2 className="text-[#1a2b5e] font-medium text-lg">
                            {selectedFloorPlan.title}
                          </h2>
                          <p className="text-gray-500">
                            TYPE {selectedFloorPlan.type}
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <p>
                          {selectedFloorPlan.sqm} sqm ({selectedFloorPlan.sqft}{" "}
                          sqft)
                        </p>
                        <p>{selectedFloorPlan.unitNumbers}</p>
                      </div>
                    </div>

                    {/* Floor plan image */}
                    <div className="relative w-full aspect-[4/3] border rounded-md overflow-hidden">
                      <div className="relative w-full h-full">
                        <Image
                          src={
                            selectedFloorPlan.imageUrl ??
                            "/placeholder.svg?height=400&width=500"
                          }
                          alt={`Floor plan for ${selectedFloorPlan.title}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="bed" className="m-0">
            <div className="grid md:grid-cols-[1fr_1.5fr]">
              {/* Floor plan list sorted by beds */}
              <div className="border-r">
                {[...FLOOR_PLANS]
                  .sort((a, b) => a.beds - b.beds)
                  .map((plan, index) => (
                    <Button
                      key={`${plan.id}-${index}`}
                      variant="ghost"
                      className={cn(
                        "w-full justify-start border-b rounded-none p-6 h-auto text-left",
                        selectedPlan === index ? "bg-gray-50" : "",
                      )}
                      onClick={() => setSelectedPlan(index)}
                    >
                      <div>
                        <h3 className="text-[#1a2b5e] font-bold text-lg">
                          {plan.id}
                        </h3>
                        <p className="text-[#1a2b5e] font-bold">
                          {plan.sqft} sqft / {plan.sqm} sqm
                        </p>
                        <p className="text-gray-500 mt-1">
                          {plan.beds} Beds • {plan.baths} Baths
                        </p>
                      </div>
                    </Button>
                  ))}
              </div>

              {/* Floor plan details - same as in type tab */}
              <div className="p-8">
                {selectedFloorPlan && (
                  <>
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="border-l-4 border-[#a8c7c3] h-10"></div>
                        <div>
                          <h2 className="text-[#1a2b5e] font-medium text-lg">
                            {selectedFloorPlan.title}
                          </h2>
                          <p className="text-gray-500">
                            TYPE {selectedFloorPlan.type}
                          </p>
                        </div>
                      </div>
                      <div className="text-right text-sm text-gray-500">
                        <p>
                          {selectedFloorPlan.sqm} sqm ({selectedFloorPlan.sqft}{" "}
                          sqft)
                        </p>
                        <p>{selectedFloorPlan.unitNumbers}</p>
                      </div>
                    </div>

                    {/* Floor plan image */}
                    <div className="relative w-full aspect-[4/3] border rounded-md overflow-hidden">
                      <div className="relative w-full h-full">
                        <Image
                          src={
                            selectedFloorPlan.imageUrl ??
                            "/placeholder.svg?height=400&width=500"
                          }
                          alt={`Floor plan for ${selectedFloorPlan.title}`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
