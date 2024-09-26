import HotkeyContent from "@/components/hotkey/HotkeyContent";
import React from "react";

/**
 * A Next.js page component that displays a single hotkey based on the route parameter "id".
 * @param {{ params: { id: string } }} props The props object containing the route parameter "id".
 * @returns {JSX.Element} A div containing the HotkeyContent component.
 */
export default function HotkeyByIdPage({
  params: { id },
}: {
  params: { id: string };
}): JSX.Element {
  return (
    <div>
      <HotkeyContent id={id} />
    </div>
  );
}
