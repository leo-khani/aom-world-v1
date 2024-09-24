import HotkeyAddNew from "@/components/hotkey/HotkeyAddNew";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Add New Hotkey | AoM World",
  description:
    "Create and share your custom Age of Mythology hotkeys with the community on AoM World.",
  openGraph: {
    title: "Add New Hotkey | AoM World",
    description:
      "Create and share your custom Age of Mythology hotkeys with the community on AoM World.",
    type: "website",
    url: "https://www.aomworld.pro/hotkey/add",
  },
};

export default function HotkeyAddPage() {
  return (
    <div>
      <HotkeyAddNew />
    </div>
  );
}
