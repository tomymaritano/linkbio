import * as HoverCard from "@radix-ui/react-hover-card";
import { useLinkPreview } from "../hooks/useLinkPreview";
import { ArrowUpRight, ArrowRight, TrendingUp } from "lucide-react";
import type { MenuItem } from "../types";
import { motion } from "framer-motion";
import { useAnalytics } from "../hooks/useAnalytics";

type Props = {
  item: MenuItem;
};

const isExternal = (url: string) => /^https?:\/\//.test(url);

const ListItemWithPreview = ({ item }: Props) => {
  const { data: preview } = useLinkPreview(item.url);
  const external = isExternal(item.url);
  const { trackClick, getClickCount } = useAnalytics();
  const clickCount = getClickCount(item.url);
  
  const handleClick = () => {
    trackClick(item);
  };

  return (
    <HoverCard.Root openDelay={200}>
      <HoverCard.Trigger asChild>
        <motion.a
          href={item.url}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          aria-label={external ? `${item.label} (opens in new tab)` : item.label}
          onClick={handleClick}
          className="group flex items-center justify-between w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl
          bg-white/40 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10
          text-xs sm:text-sm text-black dark:text-white transition-all hover:bg-white/60 dark:hover:bg-black/30"
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-3">
            <img 
              src={`https://www.google.com/s2/favicons?domain=${new URL(item.url).hostname}&sz=32`}
              alt=""
              className="w-5 h-5 rounded"
              loading="lazy"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="flex items-center gap-2">
              <span className="transition-transform group-hover:translate-x-1 font-body font-semibold line-clamp-1">
                {item.label}
              </span>
              {clickCount > 5 && (
                <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full 
                               bg-accent-500/10 text-accent-600 dark:text-accent-400">
                  <TrendingUp className="w-3 h-3" />
                  {clickCount}
                </span>
              )}
            </div>
          </div>
          {external ? (
            <ArrowUpRight className="arrow-icon w-4 h-4 text-gray-600 dark:text-white/60 group-hover:text-accent-500 transition-transform" />
          ) : (
            <ArrowRight className="arrow-icon w-4 h-4 text-gray-600 dark:text-white/60 group-hover:text-accent-500 transition-transform" />
          )}
        </motion.a>
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
                {preview.image && (
                  <img
                    src={preview.image}
                    alt={`Preview image for ${preview.title || item.label}`}
                    className="w-full h-32 object-cover rounded-lg border border-white/10"
                    loading="lazy"
                  />
                )}
                <div>
                  <p className="font-heading font-semibold text-sm text-black dark:text-white">{preview.title || item.label}</p>
                  {preview.description && (
                    <p className="font-body text-black/70 dark:text-white/60 text-xs line-clamp-3">{preview.description}</p>
                  )}
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