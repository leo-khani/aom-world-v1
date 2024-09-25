"use client";
import { IconX } from "@tabler/icons-react";
import React, { useState } from "react";

const BannerUpdate: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const dismissBanner = () => {
    setIsVisible(false);
    localStorage.setItem("updateBannerDismissed", "true");
  };

  if (!isVisible) return null;

  return (
    <div
      className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4"
      role="alert"
    >
      <div className="flex container mx-auto">
        <div>
          <p className="font-bold">Site Update in Progress</p>
          <p className="text-sm">
            We're currently updating our site. Some features may not work as
            intended. We apologize for any inconvenience.
          </p>
        </div>
        <button onClick={dismissBanner} className="ml-auto pl-3">
          <IconX size={30} />
        </button>
      </div>
    </div>
  );
};

export default BannerUpdate;
