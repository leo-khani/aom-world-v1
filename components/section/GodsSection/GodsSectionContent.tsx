import React from "react";
import GodsSectionCard from "./GodsSectionCard";
import { godNames } from "@/data/gods";

const GodsSectionContent: React.FC = () => {
  return (
    <div className="overflow-x-auto px-4 py-2">
      <div className="flex gap-2 max-w-min md:min-w-max">
        {Object.values(godNames).map((god) => (
          <div className="flex-shrink-0 w-full md:w-auto" key={god.id}>
            <GodsSectionCard
              key={god.id}
              id={god.id}
              src={`${god.img}`}
              alt={god.name}
              name={god.name}
              description={god.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GodsSectionContent;
