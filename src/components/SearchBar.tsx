"use client";

import { Loader2, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useRef, useState, useTransition, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

const SearchBarContent = () => {
  const searchParams = useSearchParams();
  const defaultQuery = searchParams.get("query") || "";
  const inputRef = useRef<HTMLInputElement>(null);
  const [isSearching, startTransition] = useTransition();
  const router = useRouter();
  const [query, setQuery] = useState<string>(defaultQuery);

  const search = () => {
    startTransition(() => {
      router.push(`/search?query=${query}`);
    });
  };

  const placeholders = [
    "crying necklace",
    "uneasy watch",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search();
  };

  return (
    <div className="relative w-full h-14 flex flex-col">
      <div className="relative h-14 z-10 rounded-md">
        <Input
          disabled={isSearching}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              search();
            }

            if (e.key === "Escape") {
              inputRef?.current?.blur();
            }
          }}
          ref={inputRef}
          className="absolute inset-0 h-full"
          placeholder=" enter your search eg: watch, ring, or necklace"
        />

        <Button
          disabled={isSearching}
          size="sm"
          variant={"secondary"}
          onClick={search}
          className="absolute right-0 inset-y-0 h-full rounded-l-none"
        >
          {isSearching ? (
            <Loader2 className="h-6 w-6 animate-spin" />
          ) : (
            <Search className="h-6 w-6" />
          )}
        </Button>
      </div>
    </div>
  );
};

const SearchBar = () => (
  <Suspense fallback={<div></div>}>
    <SearchBarContent />
  </Suspense>
);

export default SearchBar;
