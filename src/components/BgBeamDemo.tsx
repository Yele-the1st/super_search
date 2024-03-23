"use client";
import { FC } from "react";
import { BackgroundBeams } from "./ui/BackgroundBeams";
import SearchBar from "./SearchBar";

interface BgBeamDemoProps {
  children: React.ReactNode;
}

const BgBeamDemo: FC<BgBeamDemoProps> = ({ children }) => {
  return (
    <div className="h-full min-h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl h-full mx-auto p-4">
        <h1 className="relative z-10 text-4xl md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500  text-center font-bold">
          Super Search
        </h1>
        <p></p>
        <p className="text-neutral-400 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          A beautifully designed, hybrid search engine that enhances search
          accuracy by querying semantically related results.
        </p>
        <div className="mx-auto mt-16 w-full max-w-2xl flex flex-col">
          <SearchBar />

          {children}
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default BgBeamDemo;
