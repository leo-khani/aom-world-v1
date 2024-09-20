"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { IconCaretUpDown } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { apiData } from "@/config/api";

// Define types
interface Player {
  label: string;
  value: string;
  description: string;
}

interface ApiResponse {
  items: Array<{
    userName: string;
    rlUserId: string | number;
    elo: number;
  }>;
}

// SelectorIcon component
const SelectorIcon = () => <IconCaretUpDown stroke={1} size={16} />;

// Cache implementation
const useCache = () => {
  const cache = useRef(new Map());
  return {
    get: (key: string) => cache.current.get(key),
    set: (key: string, value: Player[]) => cache.current.set(key, value),
  };
};

// Main SearchBar component
// Main SearchBar component
const SearchBar = () => {
  const [data, setData] = useState<Player[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const cache = useCache();
  const router = useRouter();

  // Ensure component is mounted before running client-side code
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch data from API
  const fetchData = useCallback(async () => {
    if (searchValue.trim() === "") {
      setData([]);
      return;
    }

    // Check cache first
    const cachedData = cache.get(searchValue);
    if (cachedData) {
      setData(cachedData);
      return;
    }

    setIsLoading(true);
    try {
      // if search value is > 3 characters return
      if (searchValue.length < 3) {
        return;
      }
      const response = await fetch(
        `${apiData.url}${apiData.public.getLeaderboard}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            region: "7",
            matchType: "1",
            consoleMatchType: 15,
            searchPlayer: searchValue,
            page: 1,
            count: 10,
            sortColumn: "rank",
            sortDirection: "ASC",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result: ApiResponse = await response.json();
      const players = result.items.map((player) => ({
        label: player.userName,
        value: player.rlUserId.toString(),
        description: `Elo: ${player.elo}`,
      }));
      setData(players);
      cache.set(searchValue, players);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([{ label: "...", value: "...", description: "" }]);
    } finally {
      setIsLoading(false);
    }
  }, [searchValue, cache]);

  // Fetch data when searchValue changes
  useEffect(() => {
    if (isMounted) {
      const debounceTimer = setTimeout(() => {
        fetchData();
      }, 300); // Debounce API calls

      return () => clearTimeout(debounceTimer);
    }
  }, [fetchData, searchValue, isMounted]);

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  // Handle selection change
  const handleSelectionChange = (key: React.Key | null) => {
    if (key !== null && isMounted) {
      const selectedItem = data.find((item) => item.value === key);
      if (selectedItem) {
        router.push(`/player/${selectedItem.value}`);
      }
    }
  };

  // Handle autocomplete close
  const handleClose = () => {
    setSearchValue("");
    setData([]);
  };

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Autocomplete
        aria-label="SearchPlayer"
        placeholder={"Search for player..."}
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
        classNames={{
          base: "text-gray-950",
        }}
      >
        {(item) => (
          <AutocompleteItem
            aria-label={item.label}
            className="text-gray-800"
            key={item.value}
            value={item.value}
          >
            {item.label}
          </AutocompleteItem>
        )}
      </Autocomplete>
    </div>
  );
};
export default SearchBar;
