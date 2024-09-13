import React from "react";
import TitleSection from "../ui/title-section";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";

const YoutubeVideos = () => {
  return (
    <div>
      <TitleSection
        title="Youtube Videos"
        icon={<IconBrandYoutubeFilled size={32} />}
      />
    </div>
  );
};

export default YoutubeVideos;
