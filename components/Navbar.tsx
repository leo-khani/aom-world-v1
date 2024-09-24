"use client";
import { siteConfig } from "@/config/site";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import { IconBrandDiscord, IconMenu, IconX } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import FocusTrap from "focus-trap-react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

// Animation variants
const menuVariants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.01,
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.1,
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: -10 },
};

// Logo component
const Logo = () => (
  <div className="flex items-center flex-shrink-0 mr-6">
    <Link href="/" className="text-2xl font-bold text-yellow-500">
      {siteConfig.title}
      {siteConfig.beta && <span className="text-xs text-white"> BETA</span>}
    </Link>
  </div>
);

// Mobile menu button component
const MobileMenuButton = ({
  onClick,
  isOpen,
}: {
  onClick: () => void;
  isOpen: boolean;
}) => (
  <div className="block lg:hidden">
    <Button
      isIconOnly
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="flex items-center rounded-md text-white hover:text-yellow-500 bg-neutral-800"
      aria-label="Toggle menu"
    >
      {isOpen ? <IconX /> : <IconMenu />}
    </Button>
  </div>
);

// Navigation items component
const NavigationItems = () => (
  <div className="text-sm lg:flex-grow">
    {siteConfig.navbarItems.map((item) => (
      <motion.div
        key={item.name}
        variants={itemVariants}
        className="block lg:inline-block"
      >
        <Link
          href={item.link}
          className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-yellow-500 mr-4"
        >
          <Button className="text-md py-2 rounded-md bg-transparent text-white hover:bg-neutral-800 sm:w-full">
            {item.icon}
            {item.name}
          </Button>
        </Link>
      </motion.div>
    ))}
  </div>
);

// Search and Donate component
const SearchAndDonate = () => (
  <div className="flex flex-col sm:flex-row items-center mt-4 lg:mt-0">
    <Link href={siteConfig.socialLinks.discord} className="mr-3">
      <Button
        isIconOnly
        className="text-md py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-400 sm:w-full "
        color="primary"
      >
        <IconBrandDiscord className="text-white" size={24} />
      </Button>
    </Link>
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
    <div className="mt-4 sm:mt-0 sm:ml-4 hidden">
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  </div>
);

// Main Navbar component
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  return (
    <FocusTrap active={isMenuOpen}>
      <nav className="bg-background">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-between items-center">
            <Logo />
            <MobileMenuButton onClick={toggleMenu} isOpen={isMenuOpen} />
            <div className="hidden lg:flex lg:items-center lg:w-auto">
              <NavigationItems />
              <SearchAndDonate />
            </div>
          </div>
        </div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="w-full overflow-hidden bg-background lg:hidden"
            >
              <div className="px-4 sm:px-6 lg:px-8 py-4">
                <NavigationItems />
                <SearchAndDonate />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </FocusTrap>
  );
};

export default Navbar;

// TODO: Implement lazy loading for the SearchBar component to improve initial load time
// TODO: Add animation to the mobile menu opening/closing for a smoother user experience
// TODO: Implement a theme switcher (light/dark mode) in the navbar
// TODO: Add internationalization support for navbar items
// TODO: Optimize images, especially the "Buy Me A Coffee" button, consider using next/image
// TODO: Implement proper SEO meta tags in the head of the document
// TODO: Add unit tests for each component to ensure reliability
// TODO: Implement error boundaries to gracefully handle any rendering errors
// TODO: Consider using CSS modules or styled-components for better CSS organization
// TODO: Implement proper keyboard navigation support for accessibility
