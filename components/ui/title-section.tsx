import { IconArrowNarrowRight } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

interface TitleSectionProps {
  title: string;
  subTitle?: string;
  icon: React.ReactNode;
  btn?: boolean;
  btnText?: string;
  btnLink?: string;
}
export default function TitleSection({
  title,
  subTitle,
  icon,
  btn,
  btnText = "See more",
  btnLink = "/hotkey",
}: TitleSectionProps) {
  return (
    <div className="flex justify-between items-center gap-2 mt-5">
      <div className="flex flex-row items-center gap-2">
        <div>{icon}</div>
        <div>
          <span className="text-3xl font-semibold mr-2">{title}</span>
          {subTitle ? (
            <span className="text-sm text-neutral-300">{subTitle}</span>
          ) : null}
        </div>
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
