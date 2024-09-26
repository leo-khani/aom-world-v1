"use client";

import React from "react";
import {
  IconShield,
  IconUser,
  IconLock,
  IconWorld,
  IconAlertCircle,
  IconMail,
} from "@tabler/icons-react";

const PrivacyPolicy = () => {
  return (
    <div className="py-16">
      <div className="max-w-5xl mx-auto py-8 px-12 bg-secondary text-gray-100 rounded-xl shadow-2xl">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">
          Aomworld.pro Privacy Pledge
        </h1>

        <div className="space-y-8">
          <Section
            icon={<IconShield size={24} />}
            title="Our Commitment to Your Privacy"
            content="At Aomworld.pro, we believe in transparency and respect for your digital footprint. Our approach to privacy is proactive, not reactive. We're not just complying with regulations; we're setting a new standard for user data protection in the gaming community."
          />

          <Section
            icon={<IconUser size={24} />}
            title="Your Digital Identity"
            content="We understand that your online presence is an extension of you. The information you share with us - like your username, email, and gaming preferences - is treated with the utmost care. We use this data solely to enhance your Aomworld.pro experience, never to exploit or monetize."
          />

          <Section
            icon={<IconLock size={24} />}
            title="Fortress-Level Security"
            content="Your data is protected by state-of-the-art security measures. We employ end-to-end encryption, regular security audits, and a dedicated cybersecurity team to ensure your information is as safe as a dragon's hoard."
          />

          <Section
            icon={<IconWorld size={24} />}
            title="Global Gaming, Local Privacy"
            content="While we connect gamers worldwide, we respect local privacy laws. Whether you're raiding from Rome or strategizing in Seoul, your data is handled in compliance with your local regulations, including GDPR, CCPA, and others."
          />

          <Section
            icon={<IconAlertCircle size={24} />}
            title="Transparency is Our Policy"
            content="We believe you have the right to know what data we collect and how we use it. You can request a comprehensive report of your data at any time. If you choose to leave our platform, we ensure complete data deletion - no questions asked."
          />

          <Section
            icon={<IconMail size={24} />}
            title="Open Communication"
            content="Have concerns or questions? Our dedicated Privacy Guardian team is just a message away. Reach out to us at nibogamesinfo@gmail.com or through our 24/7 Discord support channel."
          />
        </div>

        <p className="mt-12 text-sm text-center text-indigo-300">
          Last fortified: {new Date().toLocaleDateString()}. We regularly update
          our privacy measures to stay ahead in the ever-evolving digital
          landscape.
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
    <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center p-1">
      {icon}
    </div>
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-indigo-200">{content}</p>
    </div>
  </div>
);

export default PrivacyPolicy;
