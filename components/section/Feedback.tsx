"use client";

import { Button, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import TitleSection from "../ui/title-section";
import { IconStairsUp, IconX } from "@tabler/icons-react";

const Feedback = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      {isOpen ? (
        <div className="relative p-4 mx-4 rounded-md">
          <TitleSection title="Feedback" icon={<IconStairsUp size={32} />} />
          <br />
          <p className="mb-3">
            AoM world is in development and beta testing, feel free to share
            your feedback or suggestions.
          </p>
          <form action="https://formspree.io/f/xovazzjd" method="POST">
            <Textarea name="feedback" label="Feedback" className="m-2" />

            <Button type="submit" color="warning" className="font-bold mx-2">
              Send
            </Button>
          </form>
          <Button
            isIconOnly
            onClick={() => setIsOpen(false)}
            className="absolute top-5 right-5"
          >
            <IconX size={16} />
          </Button>
        </div>
      ) : null}
    </>
  );
};

export default Feedback;
