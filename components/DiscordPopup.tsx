"use client";
import { IconBrandDiscordFilled, IconX } from "@tabler/icons-react";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import Link from "next/link";

const DiscordPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [closeCount, setCloseCount] = useState(0);
  const [hasClosedTwice, setHasClosedTwice] = useState(false);

  useEffect(() => {
    // Check if running on client-side
    if (typeof window !== "undefined") {
      const storedCloseCount = localStorage.getItem("discordPopupCloseCount");
      if (storedCloseCount) {
        setCloseCount(parseInt(storedCloseCount, 10));
        setHasClosedTwice(parseInt(storedCloseCount, 10) >= 2);
      }

      if (!hasClosedTwice) {
        const timer = setTimeout(() => setIsVisible(true), 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [hasClosedTwice]);

  const handleClose = () => {
    setIsVisible(false);
    const newCount = closeCount + 1;
    setCloseCount(newCount);

    if (typeof window !== "undefined") {
      localStorage.setItem("discordPopupCloseCount", newCount.toString());
      if (newCount >= 2) {
        setHasClosedTwice(true);
      }
    }
  };

  if (hasClosedTwice) {
    return null;
  }
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 z-50 bg-neutral-900 dark:bg-neutral-900 rounded-lg shadow-lg p-4 max-w-xs w-full sm:w-auto"
        >
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close"
          >
            <IconX />
          </button>
          <div className="flex flex-col items-center justify-center gap-4 mt-2">
            <div className="flex flex-col items-center">
              <p className="text-sm text-white dark:text-gray-200 mb-2">
                Connect with our community for updates and discussions.
              </p>
              <Link href={siteConfig.socialLinks.discord}>
                <Button
                  startContent={<IconBrandDiscordFilled />}
                  className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 transition duration-300 text-sm"
                >
                  Join Now
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DiscordPopup;
