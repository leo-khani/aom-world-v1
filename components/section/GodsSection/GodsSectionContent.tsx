import React from "react";
import GodsSectionCard from "./GodsSectionCard";
import { godNames } from "@/data/gods";

const GodsSectionContent: React.FC = () => {
  return (
    <>
      <div className="grid grid-cols-4 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-13 gap-2 items-center justify-center">
        {Object.values(godNames).map((god, index) => (
          <GodsSectionCard
            key={index}
            id={god.id}
            src={`${god.img}`}
            alt={god.name}
            name={god.name}
            description={god.title}
          />
        ))}
      </div>
    </>
  );
};

export default GodsSectionContent;
