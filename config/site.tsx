import {
  IconBinoculars,
  IconChartBar,
  IconHome,
  IconTrophy,
} from "@tabler/icons-react";

export const siteConfig = {
  title: "AOM World",
  description: "AOM World",
  url: "https://aomworld.com",

  navbarItems: [
    {
      name: "Home",
      link: "/",
      icon: <IconHome stroke={2} size={18} />,
    },
    {
      name: "Leaderboard",
      link: "/leaderboard/1",
      icon: <IconTrophy stroke={2} size={18} />,
    },

    {
      name: "Statistics",
      link: "/statistics",
      icon: <IconChartBar stroke={2} size={18} />,
    },
    {
      name: "Watch",
      link: "/watch",
      icon: <IconBinoculars stroke={2} size={18} />,
    },
  ],
};
