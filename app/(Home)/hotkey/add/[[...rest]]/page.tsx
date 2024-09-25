import HotkeyAddNew from "@/components/hotkey/HotkeyAddNew";
import { Metadata } from "next";
import React from "react";

/**
 * Generates metadata for the HotkeyAdd page.
 *
 * @returns {Promise<Metadata>} A promise resolving to the generated metadata.
 */
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Add New Hotkey | AoM World",
    description:
      "Create and share your custom Age of Mythology hotkeys with the community on AoM World.",
    openGraph: {
      title: "Add New Hotkey | AoM World",
      description:
        "Create and share your custom Age of Mythology hotkeys with the community on AoM World.",
      type: "website",
      url: "https://www.aomworld.pro/hotkey/add",
    } as const,
  } as const;
}

export default function HotkeyAddPage(): JSX.Element {
  /**
   * The HotkeyAdd page component.
   *
   * @returns {JSX.Element} A fragment containing the HotkeyAddNew component.
   */
  return (
    <>
      <HotkeyAddNew />
    </>
  );
}
