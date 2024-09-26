import LoadingBear from "@/components/loader/LoadingBear";
import React from "react";

export default function WikiPage() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <LoadingBear />
      <h1 className="text-3xl font-bold">Wiki</h1>
      <p className="text-lg text-center">Working on it...</p>
    </div>
  );
}
