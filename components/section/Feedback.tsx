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
  Input,
} from "@nextui-org/react";
import TitleSection from "../ui/title-section";
import { IconStairsUp, IconX } from "@tabler/icons-react";

interface FeedbackButtonProps {
  text: string;
  className?: string;
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  onClick: () => void;
}

export const FeedbackButton: React.FC<FeedbackButtonProps> = ({
  text = "Give Feedback",
  className,
  color,
  onClick,
}) => {
  return (
    <Button onPress={onClick} size="sm" className={className} color={color}>
      {text}
    </Button>
  );
};

FeedbackButton.defaultProps = {
  text: "Give Feedback",
  className: "bg-zinc-950",
  color: "default",
};

interface FeedbackBannerProps {
  isClosing: boolean;
  onOpenModal: () => void;
  onCloseBanner: () => void;
  closeBtn?: boolean;
}

const FeedbackBanner = ({
  isClosing,
  onOpenModal,
  onCloseBanner,
  closeBtn = true,
}: FeedbackBannerProps) => {
  return (
    <div
      className={`bg-zinc-800 p-2 rounded-lg border border-zinc-950 flex justify-between items-center text-sm transition-all duration-300 ${
        isClosing ? "opacity-0 transform" : "opacity-100"
      }`}
    >
      <div>
        AoM world is in development and beta testing, feel free to share your
        feedback or suggestions.
      </div>
      <div className="flex gap-2">
        <FeedbackButton
          onClick={onOpenModal}
          text={"Give Feedback"}
          className="bg-zinc-950 text-white"
        />
        {closeBtn && (
          <Button
            isIconOnly
            size="sm"
            onClick={onCloseBanner}
            className="bg-zinc-950 text-white"
          >
            <IconX size={16} />
          </Button>
        )}
      </div>
    </div>
  );
};

FeedbackBanner.defaultProps = {
  isClosing: false,
  onOpenModal: () => {},
  onCloseBanner: () => {},
};

const FeedbackForm = () => {
  return (
    <form action="https://formspree.io/f/xovazzjd" method="POST">
      <div className="flex flex-col gap-2">
        <Input
          name="email"
          type="email"
          label="Your Email (optional)"
          className=""
        />
        <Textarea name="feedback" label="Feedback" className="" isRequired />
        <FeedbackButton
          text="Send"
          color="warning"
          className="font-bold"
          onClick={() => {}}
        />
      </div>
    </form>
  );
};

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal = ({ isOpen, onClose }: FeedbackModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="p-2">
      <ModalContent className="bg-neutral-800">
        <ModalHeader className="flex flex-col gap-1">
          <TitleSection title="Feedback" icon={<IconStairsUp size={32} />} />
        </ModalHeader>
        <ModalBody>
          <p className="mb-3">
            AoM world is in development and beta testing, feel free to share
            your feedback or suggestions.
          </p>
          <FeedbackForm />
        </ModalBody>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
};

FeedbackModal.defaultProps = {
  isOpen: false,
  onClose: () => {},
};

interface FeedbackProps {
  closeBtn?: boolean;
}

const Feedback = ({ closeBtn = true }: FeedbackProps = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  const closeBanner = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsBannerOpen(false);
    }, 300);
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      {isBannerOpen && (
        <FeedbackBanner
          isClosing={isClosing}
          onOpenModal={handleOpen}
          onCloseBanner={closeBanner}
          closeBtn={closeBtn}
        />
      )}
      <FeedbackModal isOpen={isOpen} onClose={handleClose} />
    </>
  );
};

export default Feedback;
