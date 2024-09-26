"use client";
import { IconX } from "@tabler/icons-react";
import React, { useState } from "react";

/**
 * A banner that displays if the user has not dismissed the banner.
 * The banner is dismissed when the user clicks the X button.
 * The banner is stored in local storage so that it persists between page reloads.
 */
const BannerUpdate = () => {
  /**
   * Initialize the state of the banner as visible if the user has not dismissed it.
   * The dismissed state is stored in local storage with the key "updateBannerDismissed".
   */
  const [isVisible, setIsVisible] = useState(false);

  /**
   * A function to dismiss the banner.
   * Sets the state of the banner to not visible and stores the dismissed state in local storage.
   */
  const dismissBanner = () => {
    setIsVisible(false);
  };

  /**
   * If the banner is visible, render the banner.
   * The banner is a div with a yellow background and a yellow border on the left side.
   * The banner contains a heading with bold text that says "Site Update in Progress".
   * The banner also contains a paragraph with text that explains the situation.
   * The banner also contains an X button on the right side that calls the dismissBanner function when clicked.
   */
  return (
    isVisible && (
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
    )
  );
};

export default BannerUpdate;
