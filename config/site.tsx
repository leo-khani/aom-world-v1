import {
  IconBinoculars,
  IconChartBar,
  IconHome,
  IconMoodSilence,
  IconTrophy,
} from "@tabler/icons-react";

export const siteConfig = {
  title: "AOM World",
  beta: true,
  description: "AOM World",
  url: "https://aomworld.com",

  navbarItems: [
    {
      name: "Home",
      link: "/",
      icon: <IconHome stroke={2} size={16} />,
    },
    {
      name: "Leaderboard",
      link: "/leaderboard/1",
      icon: <IconTrophy stroke={2} size={16} />,
    },

    {
      name: "Statistics",
      link: "/statistics",
      icon: <IconChartBar stroke={2} size={16} />,
    },
    {
      name: "Gods",
      link: "/gods-statistics",
      icon: <IconMoodSilence stroke={2} size={16} />,
    },
  ],
};
