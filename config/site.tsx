import {
  IconBinoculars,
  IconChartBar,
  IconHome,
  IconMoodSilence,
  IconSquareF0,
  IconTrophy,
} from "@tabler/icons-react";

export const siteConfig = {
  title: "AOM World",
  beta: true,
  description: "AOM World",
  url: "https://aomworld.com",

  socialLinks: {
    twitter: "https://twitter.com/aomworldpro",
    github: "https://github.com/aomworldpro",
    discord: "https://discord.gg/KQsyeqnkfx",
    instagram: "https://instagram.com/aomworldpro",
    donate: "https://buymeacoffee.com/mr_nibo",
  },

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
      name: "Hotkeys",
      link: "/hotkey",
      icon: <IconSquareF0 stroke={2} size={16} />,
    },
    {
      name: "Gods",
      link: "/gods-statistics",
      icon: <IconMoodSilence stroke={2} size={16} />,
    },
  ],
};
