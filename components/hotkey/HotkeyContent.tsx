"use client";

import { IconNewSection } from "@tabler/icons-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import TitleSection from "../ui/title-section";
import { HowToInstall } from "./HotkeyCollection";
import { HotkeyCardBig } from "./HotkeyCard";

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

const HotkeyContent = () => {
  const { id } = useParams();
  const [hotkey, setHotkey] = useState<ApiRes | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotkey = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/private/getHotkey?id=${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch hotkey");
        }
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setHotkey(data[0]);
        } else if (typeof data === "object" && data !== null) {
          setHotkey(data);
        } else {
          setError("No hotkey found");
        }
        console.log(hotkey);
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

    fetchHotkey();
  }, [id]);

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
    </div>
  );
};

export default HotkeyContent;
