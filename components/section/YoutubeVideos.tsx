import React from "react";
import TitleSection from "../ui/title-section";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import Link from "next/link";

const youtubeData = [
  {
    title: "Age of Mythology: Retold - Official Trailer",
    url: "https://www.youtube.com/watch?v=O67dQQ9ZAqs&ab_channel=AgeofEmpires",

    image: "/content/youtube-videos/01.jpg",
  },
  {
    title: "Age of Mythology Retold: Tier List!",
    url: "https://www.youtube.com/watch?v=9a6eIAYrvQU&ab_channel=IamMagic",

    image: "/content/youtube-videos/02.jpg",
  },
  {
    title: "Age of Mythology Retold: Kronos Guide + Replay Analysis",
    url: "https://www.youtube.com/watch?v=uxva7nxQbYI&ab_channel=IamMagic",
    image: "/content/youtube-videos/03.jpg",
  },
  {
    title: "Age of Mythology Retold - The Ultimate Hades Guide",
    url: "https://www.youtube.com/watch?v=ZQt5PmCZGSY&ab_channel=Aussie_Drongo",
    image: "/content/youtube-videos/04.jpg",
  },
  {
    title: "Age Of Mythology Retold Guide - Tips, Tricks, Tutorials, And More",
    url: "https://youtube.com/watch?v=wqpGlR_oQAU",
    image: "/content/youtube-videos/05.jpg",
  },
];

const YoutubeVideos = () => {
  return (
    <div className="flex flex-col gap-2 py-4">
      <TitleSection
        title="YouTube Videos"
        icon={<IconBrandYoutubeFilled size={32} />}
        btn
        btnText="See more"
        btnLink="/youtube"
      />
      <div className="grid grid-cols-5 justify-between items-center gap-5 py-2 h-full">
        {youtubeData.map((video, index) => (
          <Card key={index} className="p-2 h-full relative">
            <CardBody>
              <img
                src={video.image}
                alt={video.title}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-semibold">{video.title}</h3>
              <p className="text-sm mb-16"></p>
            </CardBody>
            <CardFooter className="absolute bottom-0 justify-center items-center pt-2">
              <Link
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-stone-800 rounded-md px-4 py-2"
              >
                Watch on YouTube
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default YoutubeVideos;
