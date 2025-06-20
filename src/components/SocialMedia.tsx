import { motion } from "framer-motion";
import { FaXTwitter, FaGithub, FaLinkedin } from "react-icons/fa6";

const socialIcons = [
  {
    icon: <FaXTwitter className="w-4 h-4" />,
    url: "https://x.com/hacklabdog",
    label: "Twitter",
  },
  {
    icon: <FaGithub className="w-4 h-4" />,
    url: "https://github.com/tomymaritano",
    label: "GitHub",
  },
  {
    icon: <FaLinkedin className="w-4 h-4" />,
    url: "https://www.linkedin.com/in/tomymaritano/",
    label: "LinkedIn",
  },
];

const SocialMedia = () => {
  return (
    <motion.div
      className="flex gap-3 justify-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      transition={{ staggerChildren: 0.15 }}
    >
      {socialIcons.map((item, index) => (
        <motion.a
          key={index}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={item.label}
          className="bg-[#21262D] text-white p-2.5 rounded-full hover:text-blue-100 transition-colors"
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
    </motion.div>
  );
};

export default SocialMedia;