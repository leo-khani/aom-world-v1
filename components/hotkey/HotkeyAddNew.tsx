"use client";
import React, { useState } from "react";
import {
  Button,
  Input,
  Textarea,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from "@nextui-org/react";
import toast from "react-hot-toast";
import Link from "next/link";
import apiDataRelative from "@/config/api";

const HotkeyAddNew: React.FC = () => {
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [xmlFile, setXmlFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !xmlFile || !email) {
      toast.error("Please fill all fields and upload an XML file");
      return;
    }

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (description.length > 100) {
      toast.error("Description must be 100 characters or less");
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("xmlFile", xmlFile);

      const response = await fetch(
        `${apiDataRelative.private.hotkey.addHotkey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add hotkey");
      }

      const result = await response.json();
      console.log("Hotkey added:", result);
      toast.success("Hotkey added successfully!");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error adding hotkey:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to add hotkey. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-[400px] mx-auto">
        <CardHeader>
          <h2 className="text-2xl font-bold">Hotkey Added Successfully</h2>
        </CardHeader>
        <CardBody>
          <p>Your hotkey has been added successfully.</p>
        </CardBody>
        <CardFooter>
          <Link href="/hotkey">
            <Button color="primary">Back to Hotkeys</Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="max-w-[400px] mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold">Add New Hotkey</h2>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            type="email"
          />
          <Input
            label="Title"
            placeholder="Enter hotkey title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            label="Description"
            placeholder="Enter hotkey description (max 100 characters)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={100}
            required
          />
          <Input
            type="file"
            placeholder="Select XML file"
            accept=".xml"
            onChange={(e) => setXmlFile(e.target.files?.[0] || null)}
            required
          />
        </form>
      </CardBody>
      <CardFooter>
        <Button color="primary" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Hotkey"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default HotkeyAddNew;
