import { siteConfig } from "@/config/site";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <>
      <div className="bg-background container mx-auto py-8 px-8">
        <div className="flex justify-between items-center grap-2 bg-primary">
          {/* Navbar Links */}
          <div className="w-1/3 flex flex-row justify-center items-center gap-12">
            {siteConfig.navbarItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="flex items-center justify-center gap-2 "
              >
                <Button className="text-lg py-6 rounded-md bg-transparent text-white hover:bg-neutral-800">
                  {item.icon}
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Logo */}
          <div className="w-1/3 text-xl font-bold flex items-center justify-center">
            <Link href="/">{siteConfig.title}</Link>
          </div>
          <div className="w-1/3 flex items-center justify-center">
            {/* Search bar */}
            <SearchBar />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
