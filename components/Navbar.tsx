"use client";
import { siteConfig } from "@/config/site";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-background container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap justify-between items-center">
        {/* Logo */}
        <div className="flex items-center flex-shrink-0 mr-6">
          <Link href="/" className="text-2xl font-bold text-yellow-500">
            {siteConfig.title}
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="block lg:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-yellow-500 hover:border-yellow-500"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        {/* Navigation items */}
        <div
          className={`w-full block flex-grow lg:flex lg:items-center lg:w-auto ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="text-sm lg:flex-grow">
            {siteConfig.navbarItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-500 mr-4"
              >
                <Button className="text-md py-2 rounded-md bg-transparent text-white hover:bg-neutral-800">
                  {item.icon}
                  {item.name}
                </Button>
              </Link>
            ))}
          </div>

          {/* Search bar and Buy Me a Coffee */}
          <div className="flex flex-col sm:flex-row items-center mt-4 lg:mt-0">
            <SearchBar />
            <div className="mt-4 sm:mt-0 sm:ml-4">
              <a href="https://www.buymeacoffee.com/mr_nibo">
                <img
                  src="https://img.buymeacoffee.com/button-api/?text=Coffee&emoji=&slug=mr_nibo&button_colour=FFDD00&font_colour=000000&font_family=Lato&outline_colour=000000&coffee_colour=ffffff"
                  alt="Buy Me A Coffee"
                  className="h-10"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
