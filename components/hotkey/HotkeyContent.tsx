"use client";

import { IconNewSection } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import TitleSection from "../ui/title-section";
import { HowToInstall } from "./HotkeyCollection";
import { HotkeyCardBig } from "./HotkeyCard";
import { parseXmlToJson } from "@/utils/parseXmlToJson";

interface ApiRes {
  id: number;
  user_id: string;
  title: string;
  description: string;
  views: number;
  downloads: number;
  likes: number;
  comments: any[];
  hotkey_data: any;
  hotkey_file: string;
  created_at: string;
  download_url: string;
}

interface ParsedHotkey {
  [group: string]: {
    [key: string]: string;
  };
}

const HotkeyContent = () => {
  const { id } = useParams();
  const [hotkey, setHotkey] = useState<ApiRes | null>(null);
  const [parsedHotkeys, setParsedHotkeys] = useState<ParsedHotkey | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotkey = async () => {
      try {
        const response = await fetch(`/api/private/getHotkey?id=${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch hotkey");
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setHotkey(data[0]);
          fetchXmlContent(data[0].download_url);
        } else if (typeof data === "object" && data !== null) {
          setHotkey(data);
          fetchXmlContent(data.download_url);
        } else {
          setError("No hotkey found");
        }
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    const fetchXmlContent = async (url: string) => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch XML content");
        }

        // Get the response as an ArrayBuffer (to handle binary data)
        const buffer = await response.arrayBuffer();

        // Decode the buffer using UTF-16
        const decoder = new TextDecoder("utf-16");
        const decodedText = decoder.decode(new Uint8Array(buffer));

        // Parse the decoded XML string into JSON
        const parsedData = await parseXmlToJson(decodedText);
        setParsedHotkeys(parsedData);
      } catch (err) {
        console.error("Error fetching XML content:", err);
        setError("Failed to fetch XML content");
      }
    };
    fetchHotkey();
  }, [id]);

  const renderHotkeys = () => {
    if (!parsedHotkeys) return null;

    return Object.entries(parsedHotkeys).map(([group, keys]) => (
      <div key={group} className="mb-4">
        <h3 className="text-lg font-bold">{group}</h3>
        <ul className="list-disc pl-5">
          {Object.entries(keys).map(([key, value]) => (
            <li key={key}>
              <span className="font-semibold">{key}:</span> {value}
            </li>
          ))}
        </ul>
      </div>
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <TitleSection
          title={`Error: ${error}`}
          icon={<IconNewSection />}
          btn={false}
        />
      </div>
    );
  }

  if (!hotkey) {
    return (
      <div>
        <TitleSection
          title="No Hotkey Found"
          icon={<IconNewSection />}
          btn={false}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <HowToInstall />
      <HotkeyCardBig {...hotkey} />
      {parsedHotkeys && (
        <div className="mt-4">
          <h2 className="text-2xl font-bold mb-4">Hotkey Configuration:</h2>
          {renderHotkeys()}
        </div>
      )}
    </div>
  );
};

export default HotkeyContent;
