import React from "react";
import Image from "next/image";
import { Link, Tooltip } from "@nextui-org/react";

interface GodsSectionCardProps {
  key: number;
  id: number;
  src: string;
  alt: string;
  name: string;
  description: string;
}

const GodsSectionCard = ({
  key,
  id,
  src,
  alt,
  name,
  description,
}: GodsSectionCardProps) => {
  return (
    <Tooltip content={description} className="bg-neutral-800" key={key}>
      <Link href={`/gods/${id}`}>
        <div className="relative w-fit group cursor-pointer">
          <Image
            src={src}
            alt={alt}
            width={166}
            height={193}
            className="rounded-xl border-2 border-zinc-950"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent group-hover:bg-black/20 to-black rounded-xl border-2 border-zinc-950 w-full duration-300"></div>
          <div className="absolute bottom-2 left-2 flex flex-col group-hover:-translate-y-4 duration-300">
            <div className="text-sm font-bold text-white    ">{name}</div>
            {/* <div className="text-xs">{description}</div>*/}
          </div>
        </div>
      </Link>
    </Tooltip>
  );
};

export default GodsSectionCard;
