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

const sharedStyles =
  "p-3 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 text-black dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors";

const tooltipStyles =
  "text-xs px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 bg-white/80 dark:bg-white/10 text-black dark:text-white backdrop-blur-md transition-opacity duration-300 data-[state=delayed-open]:opacity-100 data-[state=closed]:opacity-0";

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
                className={sharedStyles}
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
            <Tooltip.Portal>
              <Tooltip.Content side="top" sideOffset={5} className={tooltipStyles}>
                {item.label}
                <Tooltip.Arrow className="fill-white/80 dark:fill-white/10" />
              </Tooltip.Content>
            </Tooltip.Portal>
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
          <Tooltip.Portal>
            <Tooltip.Content side="top" sideOffset={5} className={tooltipStyles}>
              Toggle Theme
              <Tooltip.Arrow className="fill-white/80 dark:fill-white/10" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </Tooltip.Provider>
    </motion.div>
  );
};

export default SocialMedia;