// Configuration for social media links
import { FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";
import { ComponentType } from 'react';

export interface SocialLink {
  icon: ComponentType<{ className?: string }>;
  url: string;
  label: string;
  ariaLabel?: string;
}

export const socialConfig: SocialLink[] = [
  {
    icon: FaXTwitter,
    url: "https://x.com/hacklabdog",
    label: "Twitter",
    ariaLabel: "Follow on Twitter"
  },
  {
    icon: FaGithub,
    url: "https://github.com/tomymaritano",
    label: "GitHub",
    ariaLabel: "View GitHub profile"
  },
  {
    icon: FaLinkedin,
    url: "https://www.linkedin.com/in/tomymaritano/",
    label: "LinkedIn",
    ariaLabel: "Connect on LinkedIn"
  },
];

// Add more social networks as needed
export const additionalSocialNetworks = {
  instagram: {
    url: "https://instagram.com/",
    label: "Instagram",
  },
  youtube: {
    url: "https://youtube.com/",
    label: "YouTube",
  },
  tiktok: {
    url: "https://tiktok.com/",
    label: "TikTok",
  },
};