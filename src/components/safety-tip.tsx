"use client";

import React from "react";
import { Info } from "lucide-react";

import { Card, CardContent, CardHeader } from "./ui/card";

const safetyTips = [
  "Do not make any inspection fee without seeing the agent and property.",
  "Only pay rental fees, sales fees, or any upfront payment after you verify the landlord.",
  "Ensure you meet the agent in an open location.",
  "The agent does not represent Meqasa, and Meqasa is not liable for any monetary transaction between you and the agent.",
];
/**
 * A component that renders a card containing safety tips.
 *
 * This component displays a list of safety tips aimed at guiding users on how to safely interact 
 * with agents and landlords. It includes a header with a title and an icon, followed by a list 
 * of tips presented in a styled card.
 *
 * @returns {JSX.Element} A section element containing safety tips in a styled card.
 */

export default function SafetyTipsCard() {
  return (
    <section className="md:mt-20" aria-labelledby="safety-tips-heading">
      <Card className="border-none bg-blue-50 rounded-lg p-4">
        <CardHeader className="flex flex-row items-center gap-4 p-0">
          <h2
            id="safety-tips-heading"
            className="text-base font-semibold capitalize text-brand-accent lg:text-lg"
          >
            Safety Tips
          </h2>
          <Info
            className="inline-block h-5 w-5 text-brand-accent"
            aria-hidden="true"
          />
        </CardHeader>
        <CardContent className="p-0">
          <ul
            className="ml-4 list-inside list-disc space-y-2 text-brand-accent"
            aria-label="List of safety tips"
          >
            {safetyTips.map((tip, index) => (
              <li className="text-sm font-light" key={index}>
                {tip}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
