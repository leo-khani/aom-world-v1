import { siteConfig } from "@/config/site";
import { Spacer } from "@nextui-org/react";
import Link from "next/link";
import React from "react";
import { SupportMe } from "../Navbar";
import Feedback from "../section/Feedback";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="text-neutral-300 py-8 px-4">
        <div className="border-t border-b border-neutral-800 pb-8">
          <div className="mt-8 pt-8 text-center flex flex-col gap-4 container mx-auto">
            <div>
              <p className="text-sm">
                Made with ❤️ by Leo Khani | © {currentYear} All Rights Reserved
              </p>
              <p className="text-xs text-slate-300 mt-1">
                {siteConfig.licenceText}
              </p>
            </div>
            <Spacer y={2} />
            <div className="flex flex-row gap-4 justify-between items-end">
              <div>
                <ul className="flex flex-col gap-1">
                  {siteConfig.navbarItems.map((item) => (
                    <MenuItems key={item.name} item={item} />
                  ))}
                </ul>
              </div>
              <div>
                <ul className="flex flex-col gap-1">
                  {siteConfig.footerItems.map((item) => (
                    <MenuItems key={item.name} item={item} />
                  ))}
                </ul>
              </div>
              <div>
                <ul className="flex flex-col justify-center items-center gap-1">
                  <li>
                    <SupportMe />
                  </li>
                  <div className="w-5/6">
                    <Feedback closeBtn={false} />
                  </div>
                </ul>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

interface MenuItem {
  name: string;
  link: string;
  icon: React.ReactNode;
}

const MenuItems = ({ item }: { item: MenuItem }) => {
  return (
    <>
      <li key={item.name}>
        <Link
          href={item.link}
          className="text-sm flex gap-1 items-center text-slate-300 hover:text-white duration-100"
        >
          {item.icon}
          {item.name}
        </Link>
      </li>
    </>
  );
};

export default Footer;
