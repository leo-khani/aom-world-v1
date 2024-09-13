import React from "react";

interface TitleSectionProps {
  title: string;
  icon: React.ReactNode;
}
export default function TitleSection({ title, icon }: TitleSectionProps) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span className="text-2xl font-semibold">{title}</span>
    </div>
  );
}
