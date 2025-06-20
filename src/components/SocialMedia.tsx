import * as Tooltip from "@radix-ui/react-tooltip";
import { motion } from "framer-motion";
import { FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";
import DarkModeToggle from "./DarkModeToggle";

const socialIcons = [
  {
    icon: <FaXTwitter className="w-4 h-4 sm:w-5 sm:h-5" />,
    url: "https://x.com/hacklabdog",
    label: "Twitter",
  },
  {
    icon: <FaGithub className="w-4 h-4 sm:w-5 sm:h-5" />,
    url: "https://github.com/tomymaritano",
    label: "GitHub",
  },
  {
    icon: <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />,
    url: "https://www.linkedin.com/in/tomymaritano/",
    label: "LinkedIn",
  },
];

const SocialMedia = () => {
  return (
    <motion.div
      className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.12 }}
    >
      {socialIcons.map((item, index) => (
        <Tooltip.Provider key={index} delayDuration={200}>
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <motion.a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="bg-white dark:bg-[#21262C] text-black dark:text-white p-3 rounded-full transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 },
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
              </motion.a>
            </Tooltip.Trigger>
            <Tooltip.Content
              side="top"
              sideOffset={5}
              className="text-xs backdrop-blur-md bg-white/10 dark:bg-white/10 text-white px-3 py-1.5 rounded-lg shadow-lg border border-white/20
             data-[state=delayed-open]:opacity-100 data-[state=closed]:opacity-0 transition-opacity duration-300"
            >
              {item.label}
              <Tooltip.Arrow className="fill-white/20" />
            </Tooltip.Content>
          </Tooltip.Root>
        </Tooltip.Provider>
      ))}

      <Tooltip.Provider delayDuration={200}>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <motion.div
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: { opacity: 1, scale: 1 },
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <DarkModeToggle />
            </motion.div>
          </Tooltip.Trigger>
          <Tooltip.Content
            side="top"
            sideOffset={5}
            className="text-xs bg-gray-900 text-white px-2 py-1 rounded shadow-md"
          >
            Toggle Theme
            <Tooltip.Arrow className="fill-gray-900" />
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    </motion.div>
  );
};

export default SocialMedia;