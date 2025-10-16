"use client";
import React from "react";
import { FloatingDock as UiFloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandYoutube,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";

export default function FloatingDock() {
  const links = [
    {
      title: "Twitter",
      icon: <IconBrandTwitter className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#",
    },
    {
      title: "Facebook",
      icon: <IconBrandFacebook className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#",
    },
    {
      title: "YouTube",
      icon: <IconBrandYoutube className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#",
    },
    {
      title: "Instagram",
      icon: <IconBrandInstagram className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#",
    },
    {
      title: "LinkedIn",
      icon: <IconBrandLinkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />,
      href: "#",
    },
  ];
  return (
    <div className="flex items-center justify-center w-full">
      <UiFloatingDock items={links} />
    </div>
  );
}