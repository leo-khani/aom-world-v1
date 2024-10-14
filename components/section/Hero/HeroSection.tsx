import { siteConfig } from "@/config/site";
import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/react";
import { IconBrandSteam, IconBrandXbox } from "@tabler/icons-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div
      className="relative w-full h-72"
      style={{ aspectRatio: `${32} / ${9}` }}
    >
      <Image
        src={"/retold-header.jpg"}
        alt={"retold-header"}
        layout="fill"
        objectFit="cover"
        className="rounded-lg bg-black border border-black"
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent to-black rounded-lg"
        aria-hidden="true"
      />
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <div>
          <Image
            src={siteConfig.logo.gameIcon}
            alt="aom logo"
            width={312}
            height={312}
          />
        </div>
      </div>
      <div className="absolute bottom-0 w-full p-2">
        <div className=" bg-indigo-700 p-2 px-4 rounded-lg border border-indigo-700 flex justify-between items-center text-sm transition-all duration-300 ">
          <div>Buy the Age of Mythology: Retold Game</div>
          <div className="flex gap-2">
            <Link href={siteConfig.socialLinks.gameXbox}>
              <Button
                size="sm"
                className="bg-indigo-950"
                startContent={<IconBrandXbox size={18} />}
              >
                Xbox Store
              </Button>
            </Link>
            <Link href={siteConfig.socialLinks.gameSteam}>
              <Button
                size="sm"
                className="bg-indigo-950"
                startContent={<IconBrandSteam size={18} />}
              >
                Steam
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
