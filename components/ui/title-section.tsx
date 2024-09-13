import { IconArrowNarrowRight } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

interface TitleSectionProps {
  title: string;
  icon: React.ReactNode;
  btn?: boolean;
  btnText?: string;
  btnLink?: string;
}
export default function TitleSection({
  title,
  icon,
  btn,
  btnText = "See more",
  btnLink = "/hotkey",
}: TitleSectionProps) {
  return (
    <div className="flex justify-between items-center gap-2">
      <div className="flex items-center gap-2">
        {icon}
        <span className="text-2xl font-semibold">{title}</span>
      </div>

      {btn && (
        <Link href={btnLink}>
          <div className="flex items-center gap-2 font-semibold">
            {btnText} <IconArrowNarrowRight size={18} />
          </div>
        </Link>
      )}
    </div>
  );
}
