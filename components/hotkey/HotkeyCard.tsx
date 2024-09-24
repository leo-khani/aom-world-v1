import { Button, Card, CardBody, Chip, Tooltip } from "@nextui-org/react";
import { IconArticle, IconDownload, IconShare } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

interface HotkeyCardProps {
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
const HotkeyCard = (props: HotkeyCardProps) => {
  const filename = props.download_url.split("/").pop() || "hotkey.xml";

  const handleDownload = async () => {
    try {
      const response = await fetch(props.download_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  return (
    <Card className="p-2 cursor-pointer h-full" key={props.id}>
      <CardBody className="flex flex-col justify-between">
        <Link href={`/hotkey/${props.id}`}>
          <h3 className="text-lg font-semibold">{props.title}</h3>
        </Link>
        <p className="text-sm mb-4">{props.description}</p>
        <div className="flex flex-row justify-between items-center mt-auto">
          <div className="text-xs">
            <Chip color="primary">{props.views || 0} Views</Chip>
          </div>
          <div className="">
            <Button
              isIconOnly
              className="text-sm bg-neutral-800 rounded-full p-2 hover:scale-110 duration-300 cursor-pointer"
              onClick={handleDownload}
            >
              <IconDownload size={20} />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export const HotkeyCardBig = (props: HotkeyCardProps) => {
  const filename = props.download_url.split("/").pop() || "hotkey.xml";

  const handleDownload = async () => {
    try {
      const response = await fetch(props.download_url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };
  return (
    <Card className="p-2 cursor-pointer h-full" isPressable={false}>
      <CardBody className="flex flex-col justify-between">
        <div className="flex items-center justify-between">
          {/* Title */}
          <div className="flex items-center gap-2 text-lg font-semibold">
            <IconArticle size={20} /> {props.title}
          </div>

          {/* Share button */}
          <Tooltip content="Share" className="bg-neutral-800">
            <Button
              isIconOnly
              className="text-sm bg-neutral-800 rounded-full p-2 hover:scale-110 duration-300 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard");
              }}
            >
              <IconShare size={20} />
            </Button>
          </Tooltip>
        </div>

        <p className="text-sm mb-4 flex">{props.description}</p>
        <div className="flex flex-row justify-between items-center mt-auto">
          <div className="flex flex-row gap-2">
            <Chip color="primary">{props.views || 0} Views</Chip>
            <Chip color="primary" className="hidden">
              {props.downloads || 0} Downloads
            </Chip>
            <Chip color="danger" className="hidden">
              {props.likes || 0} Likes
            </Chip>
          </div>
          <div className="">
            <Button
              isIconOnly
              className="text-sm bg-neutral-800 rounded-full p-2 hover:scale-110 duration-300 cursor-pointer"
              onClick={handleDownload}
            >
              <IconDownload size={20} />
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default HotkeyCard;
