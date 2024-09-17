import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-neutral-300 py-8 px-4">
      <div className="">
        <div className="mt-8 pt-8 border-t border-neutral-800 text-center">
          <p className="text-sm">
            Made with ❤️ by Leo Khani | © {currentYear} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// TODO: Add proper links to social media profiles and email
// TODO: Implement a newsletter subscription form
// TODO: Add language selection for internationalization
// TODO: Include links to privacy policy and terms of service
