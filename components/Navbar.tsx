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
          <div className="w-1/3 flex flex-row justify-center items-center gap-4">
            {siteConfig.navbarItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="flex items-center justify-center gap-2 "
              >
                <Button className="text-md py-6 rounded-md bg-transparent text-white hover:bg-neutral-800">
                  {item.icon}
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Logo */}
          <div className="w-1/3 text-2xl font-bold flex items-center justify-center">
            <Link href="/" className="text-yellow-500">
              {siteConfig.title}
            </Link>
          </div>
          <div className="w-1/3 flex items-center gap-2">
            {/* Search bar */}
            <SearchBar />
            {/* Buy Me a Coffee */}
            <div className="w-28">
              <a href="https://www.buymeacoffee.com/mr_nibo">
                <img src="https://img.buymeacoffee.com/button-api/?text=Coffee&emoji=&slug=mr_nibo&button_colour=FFDD00&font_colour=000000&font_family=Lato&outline_colour=000000&coffee_colour=ffffff" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
