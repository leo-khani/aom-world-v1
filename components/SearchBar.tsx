"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Autocomplete, AutocompleteItem, Skeleton } from "@nextui-org/react";
import { IconCaretUpDown } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import apiDataRelative from "@/config/api";

interface Player {
  label: string;
  value: string;
  description: string;
}

interface ApiResponse {
  items: {
    userName: string;
    rlUserId: string | number;
    elo: number;
  }[];
}

const SelectorIcon = () => <IconCaretUpDown stroke={1} size={16} />;

const useCache = () => {
  const cache = useRef(new Map());
  return {
    get: (key: string) => cache.current.get(key),
    set: (key: string, value: Player[]) => cache.current.set(key, value),
  };
};

const SearchBar = () => {
  const [data, setData] = useState<Player[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const cache = useCache();
  const router = useRouter();

  useEffect(() => setIsMounted(true), []);

  const fetchFromMatchType = async (
    matchType: number
  ): Promise<Player[] | null> => {
    try {
      const res = await fetch(apiDataRelative.public.getLeaderboard, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          region: "7",
          matchType: matchType.toString(),
          consoleMatchType: 15,
          searchPlayer: searchValue,
          page: 1,
          count: 10,
          sortColumn: "rank",
          sortDirection: "ASC",
        }),
      });

      if (!res.ok) return null;
      const result: ApiResponse = await res.json();
      if (!result.items || result.items.length === 0) return null;

      return result.items.map((player) => ({
        label: player.userName,
        value: String(player.rlUserId),
        description: `Elo: ${player.elo}`,
      }));
    } catch (err) {
      console.error("MatchType fetch error:", err);
      return null;
    }
  };

  const fetchData = useCallback(async () => {
    if (searchValue.trim() === "" || searchValue.length < 3) {
      setData([]);
      return;
    }

    const cached = cache.get(searchValue);
    if (cached) {
      setData(cached);
      return;
    }

    setIsLoading(true);

    const matchTypes = [1, 2, 3, 4];
    let found: Player[] | null = null;

    for (const matchType of matchTypes) {
      found = await fetchFromMatchType(matchType);
      if (found) break;
    }

    if (found) {
      setData(found);
      cache.set(searchValue, found);
    } else {
      setData([{ label: "Nothing found", value: "...", description: "" }]);
    }

    setIsLoading(false);
  }, [searchValue, cache]);

  useEffect(() => {
    if (!isMounted) return;
    const debounce = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchValue, fetchData, isMounted]);

  const handleSearchChange = (value: string) => setSearchValue(value);

  const handleSelectionChange = (key: React.Key | null) => {
    if (key && key !== "...") {
      router.push(`/player/${key}`);
    }
  };

  const handleClose = () => {
    setSearchValue("");
    setData([]);
  };

  if (!isMounted) {
    return (
      <div className="flex justify-center items-center">
        <Skeleton style={{ width: 200, height: 40 }} className="rounded-2xl" />
      </div>
    );
  }

  return (
    <div>
      <Autocomplete
        aria-label="SearchPlayer"
        placeholder="Search for player..."
        inputValue={searchValue}
        onInputChange={handleSearchChange}
        onSelectionChange={handleSelectionChange}
        onClose={handleClose}
        labelPlacement="outside"
        className="max-w-md w-full text-gray-800"
        disableSelectorIconRotation
        selectorIcon={<SelectorIcon />}
        isLoading={isLoading}
        items={data}
        classNames={{ base: "text-gray-950" }}>
        {(item) => (
          <AutocompleteItem key={item.value} value={item.value}>
            {item.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
};

export default SearchBar;
