"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import React, { useState, useEffect } from "react";

// Define the type for your API data
interface Player {
  label: string;
  value: string;
  description: string;
}

const SearchBar = () => {
  const [data, setData] = useState<Player[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Fetch data from the API whenever searchValue changes
  useEffect(() => {
    const fetchData = async () => {
      if (searchValue.trim() === "") {
        setData([]);
        return;
      }

      setIsLoading(true);
      try {
        console.log("searchValue", searchValue);
        const response = await fetch(
          "https://api.ageofempires.com/api/agemyth/Leaderboard",
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
              count: 10, // Fetch more results for better autocomplete suggestions
              sortColumn: "rank",
              sortDirection: "ASC",
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();
        console.log("result", result);
        // Assuming result contains players data in a specific format
        const players = result.items.map(
          (player: {
            userName: any;
            rlUserId: { toString: () => any };
            elo: any;
          }) => ({
            label: player.userName,
            value: player.rlUserId.toString(),
            description: `Elo: ${player.elo}`, // Customize as needed
          })
        );
        setData(players);
        console.log("players", players);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchValue]);

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  // Handle Autocomplete events
  const handleOpenChange = (isOpen: boolean) => {
    console.log("Autocomplete opened:", isOpen);
  };

  const handleSelectionChange = (key: React.Key | null) => {
    if (key !== null) {
      console.log("Selected key:", key);
    } else {
      console.log("Selection cleared");
    }
  };

  const handleClose = () => {
    console.log("Autocomplete closed");
  };

  return (
    <div>
      <Autocomplete
        placeholder="Search player"
        value={searchValue}
        onInputChange={handleSearchChange} // Use onInputChange to handle changes
        onOpenChange={handleOpenChange}
        onSelectionChange={handleSelectionChange}
        onClose={handleClose}
        labelPlacement="outside"
        className="max-w-xs text-gray-800"
        disableSelectorIconRotation
        selectorIcon={<SelectorIcon />}
        isLoading={isLoading}
      >
        {data.slice(0, 10).map((item) => (
          <AutocompleteItem
            className="text-gray-800"
            key={item.value}
            href={`/player/${item.label}`}
          >
            {item.label}
          </AutocompleteItem>
        ))}
      </Autocomplete>
    </div>
  );
};

export const SelectorIcon = (props: any) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path d="M0 0h24v24H0z" fill="none" stroke="none" />
    <path d="M8 9l4 -4l4 4" />
    <path d="M16 15l-4 4l-4 -4" />
  </svg>
);

export default SearchBar;
