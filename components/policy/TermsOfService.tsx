"use client";

import React from "react";
import {
  IconGavel,
  IconUserCheck,
  IconAlertTriangle,
  IconCoin,
  IconMessageReport,
  IconRefresh,
} from "@tabler/icons-react";

const TermsOfService = () => {
  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto py-8 px-12 bg-secondary text-gray-100 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">
          Aomworld.pro Adventurer's Code
        </h1>

        <div className="space-y-8">
          <Section
            icon={<IconGavel size={24} />}
            title="The Binding Scroll"
            content="By accessing Aomworld.pro, you're not just entering a website, you're joining a realm. These terms are your binding scroll - they govern your adventures here. Read them carefully, brave explorer, for they are the laws of our digital land."
          />

          <Section
            icon={<IconUserCheck size={24} />}
            title="Your Heroic Identity"
            content="To embark on quests in Aomworld.pro, you must create an account. Choose your username wisely, for it is your banner in our realm. You are the guardian of your account - keep your login details secret, safe, and away from the prying eyes of dungeon trolls."
          />

          <Section
            icon={<IconAlertTriangle size={24} />}
            title="Code of Conduct"
            content="In our realm, honor is paramount. Cheating, harassment, or any form of malicious behavior are grave offenses. Such actions may result in banishment from our lands. Be excellent to each other, and let fair play be your guiding star."
          />

          <Section
            icon={<IconCoin size={24} />}
            title="The Royal Treasury"
            content="Some areas of our realm may require tribute (payment). All transactions are conducted through our secure Royal Treasury. Prices are displayed in your local currency. Remember, purchases are final - choose wisely before exchanging your gold coins."
          />

          <Section
            icon={<IconMessageReport size={24} />}
            title="Ye Olde Feedback Scroll"
            content="Your voice matters in shaping our realm. Use the Feedback Scroll to share your thoughts, report bugs, or suggest improvements. While we value your input, remember that by submitting ideas, you grant us the right to use them to enhance Aomworld.pro."
          />

          <Section
            icon={<IconRefresh size={24} />}
            title="Evolving Lore"
            content="As our realm grows, so too may these terms. We'll notify you of significant changes, but it's your responsibility to check this scroll periodically. Your continued use of Aomworld.pro after changes means you accept the updated terms."
          />
        </div>

        <p className="mt-12 text-sm text-center text-indigo-300">
          Last updated: {new Date().toLocaleDateString()}. May these terms guide
          your journey through the vast landscapes of Aomworld.pro.
        </p>
      </div>
    </div>
  );
};

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}
const Section = ({ icon, title, content }: SectionProps) => (
  <div className="flex items-start space-x-4">
    <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
      {icon}
    </div>
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-blue-200">{content}</p>
    </div>
  </div>
);

export default TermsOfService;
