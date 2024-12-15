"use client";
import { useState } from "react";

export default function TemplateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [count, setCount] = useState(0);
  return (
    <div className="border-2 border-dashed border-black p-4 mx-auto mt-10">
      <h2>Dashboard Layout {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      {children}
    </div>
  );
}
