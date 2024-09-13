"use client";
import React from "react";
import TitleSection from "../ui/title-section";
import { IconDownload, IconKeyboardShow } from "@tabler/icons-react";
import { Card, CardBody, Spinner } from "@nextui-org/react";
import Link from "next/link";
import { tr } from "framer-motion/client";

const data = [
  {
    title: "Basic Controls",
    body: "WASD for camera movement, Arrow keys for panning.",
    author: "Game Settings",
    footer: "Last updated: Aug 2023",
  },
  {
    title: "Unit Commands",
    body: "Right-click to move, 'A' for attack, 'G' for gather resources.",
    author: "Hotkey Guide",
    footer: "Last updated: Aug 2023",
  },
  {
    title: "Building Construction",
    body: "'B' to open building menu, 'F' for farms, 'H' for houses.",
    author: "Gameplay Tips",
    footer: "Last updated: Aug 2023",
  },
  {
    title: "Advanced Hotkeys",
    body: "'Ctrl+1-9' to assign group, 'Tab' to cycle through groups.",
    author: "User Manual",
    footer: "Last updated: Aug 2023",
  },
  {
    title: "Camera Shortcuts",
    body: "'Home' to reset view, 'End' for tactical overview.",
    author: "Game Settings",
    footer: "Last updated: Aug 2023",
  },
];

const Hotkey = () => {
  const [loading, setLoading] = React.useState(true);

  // 2 sec for loading
  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <>
      <div className="flex flex-col gap-2 py-4">
        {loading ? (
          <>
            <Spinner color="success" size="lg" className="py-8" />
          </>
        ) : (
          <>
            <TitleSection
              title="Hotkeys"
              icon={<IconKeyboardShow size={32} />}
              btn
            />
            <div className="grid grid-cols-5 justify-between items-center gap-5 py-2">
              {data.map((item, index) => (
                <Link href="/hotkey" key={index}>
                  <Card className="p-2 cursor-pointer">
                    <CardBody>
                      {item.body}{" "}
                      <div className="flex flex-row justify-between items-center pt-5">
                        <div className="text-sm">Source: {item.footer}</div>
                        <div className="text-sm bg-neutral-800 rounded-full p-2 hover:scale-110 duration-300 cursor-pointer">
                          <Link href="#">
                            <IconDownload size={20} className="" />
                          </Link>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Hotkey;
