import React from "react";

export default function Shell({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="w-full lg:mx-auto flex lg:max-w-6xl px-4 md:px-0">
      {children}
    </section>
  );
}
