"use client";

import React, { useEffect, useState } from "react";
import HotkeyCard from "./HotkeyCard";
import TitleSection from "../ui/title-section";
import {
  IconCirclePlus,
  IconKeyboardShow,
  IconNewSection,
} from "@tabler/icons-react";
import Loading from "../Loading";
import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";

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

const HotkeyCollection = () => {
  const [hotkeys, setHotkeys] = useState<ApiRes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotkeys = async () => {
      try {
        const response = await fetch("/api/private/getHotkey");
        if (!response.ok) {
          throw new Error("Failed to fetch hotkeys");
        }
        const data: ApiRes[] = await response.json();
        setHotkeys(data);
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

    fetchHotkeys();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen gap-2">
        Be the first to add your hotkey to this page.{" "}
        <Link
          href="/hotkey/add"
          className="bg-secondary rounded-md p-2 flex items-center gap-2"
        >
          <IconCirclePlus size={20} /> Add Hotkey
        </Link>
      </div>
    );
  }

  return (
    <div>
      <HowToInstall />
      <TitleSection
        title="Hotkey Collection"
        icon={<IconNewSection size={32} />}
        btn
        btnText="Add Hotkey"
        btnLink="/hotkey/add"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 py-2 mt-5">
        {hotkeys.length > 0 ? (
          hotkeys.map((hotkey) => (
            <HotkeyCard
              key={hotkey.id}
              id={hotkey.id}
              user_id={hotkey.user_id}
              title={hotkey.title}
              description={hotkey.description}
              views={hotkey.views}
              downloads={hotkey.downloads}
              likes={hotkey.likes}
              comments={hotkey.comments}
              hotkey_data={hotkey.hotkey_data}
              hotkey_file={hotkey.hotkey_file}
              created_at={hotkey.created_at}
              download_url={hotkey.download_url}
            />
          ))
        ) : (
          <p>No hotkeys found.</p>
        )}
      </div>
    </div>
  );
};

export const HotkeyBar = () => {
  const [hotkeys, setHotkeys] = useState<ApiRes[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotkeys = async () => {
      try {
        const response = await fetch("/api/private/getHotkey");
        if (!response.ok) {
          throw new Error("Failed to fetch hotkeys");
        }
        const data: ApiRes[] = await response.json();
        setHotkeys(data);
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

    fetchHotkeys();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen py-4">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4 mx-4">
        <TitleSection
          title="Hotkeys"
          icon={<IconKeyboardShow size={32} />}
          btn
          btnLink="/hotkey"
        />
        <div className="flex justify-center items-center gap-2 mb-5">
          Be the first to add your hotkey to this page.{" "}
          <Link
            href="/hotkey/add"
            className="bg-secondary rounded-md p-2 flex items-center gap-2"
          >
            <IconCirclePlus size={20} /> Add Hotkey
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 mx-4">
      <TitleSection
        title="Hotkeys"
        icon={<IconKeyboardShow size={32} />}
        btn
        btnLink="/hotkey"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4 py-2 mt-5">
        {hotkeys.length > 0 ? (
          hotkeys
            .slice(0, 5)
            .map((hotkey) => (
              <HotkeyCard
                key={hotkey.id}
                id={hotkey.id}
                user_id={hotkey.user_id}
                title={hotkey.title}
                description={hotkey.description}
                views={hotkey.views}
                downloads={hotkey.downloads}
                likes={hotkey.likes}
                comments={hotkey.comments}
                hotkey_data={hotkey.hotkey_data}
                hotkey_file={hotkey.hotkey_file}
                created_at={hotkey.created_at}
                download_url={hotkey.download_url}
              />
            ))
        ) : (
          <p>No hotkeys found.</p>
        )}
      </div>
    </div>
  );
};

export const HowToInstall = () => {
  return (
    <Card className="p-2 h-full">
      <CardBody className="">
        <h3 className="text-lg font-semibold">How to install?</h3>
        <p className="text-sm mb-4">1. Download the file</p>
        <p className="text-sm mb-4">
          2. Open your game location and drag and drop the file to your game
          folder <br />
          e.g. C:\Users\[username]\Games\Age of Mythology
          Retold\[steamId]\users\
        </p>
      </CardBody>
    </Card>
  );
};

export default HotkeyCollection;
