"use client";

import React, { useState } from "react";
import {
  Button,
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import TitleSection from "../ui/title-section";
import { IconStairsUp, IconX } from "@tabler/icons-react";

const Feedback = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isBannerOpen, setIsBannerOpen] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const closeBanner = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsBannerOpen(false);
    }, 300); // This should match the transition duration
  };

  return (
    <>
      {isBannerOpen && (
        <>
          <div
            className={`bg-indigo-700 p-2 px-4 rounded-lg border border-indigo-700 flex justify-between items-center text-sm mx-4 mb-2 transition-all duration-300 ${
              isClosing ? "opacity-0 transform" : "opacity-100"
            }`}
          >
            <div>
              AoM world is in development and beta testing, feel free to share
              your feedback or suggestions.
            </div>
            <div className="flex gap-2">
              <Button onPress={onOpen} size="sm" className="bg-indigo-950">
                Give Feedback
              </Button>

              <Button
                isIconOnly
                size="sm"
                onClick={() => closeBanner()}
                className="bg-indigo-950"
              >
                <IconX size={16} />
              </Button>
            </div>
          </div>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="p-2">
            <ModalContent className="bg-neutral-800">
              {(onClose) => (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    <TitleSection
                      title="Feedback"
                      icon={<IconStairsUp size={32} />}
                    />
                  </ModalHeader>
                  <ModalBody>
                    <p className="mb-3">
                      AoM world is in development and beta testing, feel free to
                      share your feedback or suggestions.
                    </p>
                    <form
                      action="https://formspree.io/f/xovazzjd"
                      method="POST"
                    >
                      <div className="flex flex-col gap-2">
                        <Input
                          name="email"
                          type="email"
                          label="Your Email (optional)"
                          className=""
                        />

                        <Textarea
                          name="feedback"
                          label="Feedback"
                          className=""
                          isRequired
                        />
                        <Button
                          type="submit"
                          color="warning"
                          className="font-bold"
                        >
                          Send
                        </Button>
                      </div>
                    </form>
                  </ModalBody>
                  <ModalFooter></ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
    </>
  );
};

export default Feedback;
