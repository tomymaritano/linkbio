import * as HoverCard from "@radix-ui/react-hover-card";
import { useLinkPreview } from "../hooks/useLinkPreview";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { MenuItem } from "../types";
import { motion } from "framer-motion";

type Props = {
  item: MenuItem;
};

const isExternal = (url: string) => /^https?:\/\//.test(url);

const ListItemWithPreview = ({ item }: Props) => {
  const { data: preview } = useLinkPreview(item.url);
  const external = isExternal(item.url);

  return (
    <HoverCard.Root openDelay={200}>
      <HoverCard.Trigger asChild>
        <a
          href={item.url}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          aria-label={external ? `${item.label} (opens in new tab)` : item.label}
          className="group flex items-center justify-between w-full px-4 py-3 rounded-xl
          bg-white/40 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10
          text-sm text-black dark:text-white transition-all "
        >
          <span className="transition-transform group-hover:translate-x-1 font-medium">
            {item.label}
          </span>
          {external ? (
            <ArrowUpRight className="w-4 h-4 text-gray-600 dark:text-white/60 group-hover:text-indigo-500 group-hover:scale-110 transition-transform" />
          ) : (
            <ArrowRight className="w-4 h-4 text-gray-600 dark:text-white/60 group-hover:text-indigo-500 group-hover:scale-110 transition-transform" />
          )}
        </a>
      </HoverCard.Trigger>

      {preview && (
        <HoverCard.Portal>
          <HoverCard.Content side="right" align="start" asChild forceMount>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              className="bg-white/40 dark:bg-black/30 backdrop-blur-lg border border-black/10 dark:border-white/10 rounded-xl p-4 w-72 z-50"
            >
              <div className="space-y-2">
                <img
                  src={preview.image}
                  alt={preview.title}
                  className="w-full h-32 object-cover rounded-lg border border-white/10"
                />
                <div>
                  <p className="font-semibold text-sm text-black dark:text-white">{preview.title}</p>
                  <p className="text-black/70 dark:text-white/60 text-xs line-clamp-3">{preview.description}</p>
                </div>
              </div>
            </motion.div>
          </HoverCard.Content>
        </HoverCard.Portal>
      )}
    </HoverCard.Root>
  );
};

export default ListItemWithPreview;