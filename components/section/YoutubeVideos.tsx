import React from "react";
import TitleSection from "../ui/title-section";
import { IconBrandYoutubeFilled } from "@tabler/icons-react";
import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";

const youtubeData = [
  {
    title: "Age of Mythology: Retold - Official Trailer",
    url: "https://youtube.com/watch?v=dummyurl1",
    description:
      "Watch the first official trailer for Age of Mythology: Retold!",
    image: "/content/youtube-videos/01.jpg",
  },
  {
    title: "Top 10 Tips for Beginners",
    url: "https://youtube.com/watch?v=dummyurl2",
    description:
      "Learn the top strategies to help you get started in Age of Mythology: Retold.",
    image: "https://via.placeholder.com/150/TipsForBeginners.jpg",
  },
  {
    title: "Advanced Gameplay Mechanics Explained",
    url: "https://youtube.com/watch?v=dummyurl3",
    description:
      "A deep dive into the advanced mechanics and features of the game.",
    image: "https://via.placeholder.com/150/GameplayMechanics.jpg",
  },
  {
    title: "Building an Effective Economy",
    url: "https://youtube.com/watch?v=dummyurl4",
    description:
      "Tips and tricks for managing resources and building a strong economy.",
    image: "https://via.placeholder.com/150/EffectiveEconomy.jpg",
  },
  {
    title: "Mastering God Powers",
    url: "https://youtube.com/watch?v=dummyurl5",
    description:
      "An overview of all God Powers and how to use them effectively.",
    image: "https://via.placeholder.com/150/GodPowers.jpg",
  },
];

const YoutubeVideos = () => {
  return (
    <div className="flex flex-col gap-2 py-4">
      <TitleSection
        title="YouTube Videos"
        icon={<IconBrandYoutubeFilled size={32} />}
      />
      <div className="grid grid-cols-5 justify-between items-center gap-5 py-2">
        {youtubeData.map((video, index) => (
          <Card isPressable key={index} className="p-2">
            <CardBody>
              <img
                src={video.image}
                alt={video.title}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-semibold">{video.title}</h3>
              <p className="text-sm mb-2">{video.description}</p>
              <div className="flex justify-between items-center pt-2">
                <Link
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Watch on YouTube
                </Link>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default YoutubeVideos;
