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
        <motion.a
          key={index}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          title={item.label}
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
      ))}

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
    </motion.div>
  );
};

export default SocialMedia;