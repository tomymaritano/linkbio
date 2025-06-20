// components/ListItemWithPreview.tsx
import * as HoverCard from "@radix-ui/react-hover-card";
import { useLinkPreview } from "../hooks/useLinkPreview";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import type { MenuItem } from "../types";
import { motion } from 'framer-motion'

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
                    className="group flex items-center justify-between w-full rounded-lg 
                     bg-gray-100 dark:bg-[#30363D] px-4 py-3 text-left text-sm 
                     text-gray-900 dark:text-white outline-none focus-visible:ring-2 
                     focus-visible:ring-indigo-500 hover:bg-gray-200 dark:hover:bg-[#21262C] 
                     transition-colors duration-200"
                >
                    <span className="transition-transform group-hover:translate-x-1">{item.label}</span>
                    {external ? (
                        <ArrowUpRight className="w-4 h-4 text-gray-500 dark:text-white/70 group-hover:text-indigo-500 group-hover:scale-110 transition-transform" />
                    ) : (
                        <ArrowRight className="w-4 h-4 text-gray-500 dark:text-white/70 group-hover:text-indigo-500 group-hover:scale-110 transition-transform" />
                    )}
                </a>
            </HoverCard.Trigger>

            {preview && (
                <HoverCard.Content
                    side="right"
                    align="start"
                    asChild
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.25 }}
                        className="bg-[#30363D] backdrop-blur-md border border-white/10 
                 text-white rounded-xl p-4 shadow-2xl w-72 z-50 
                 transition-colors duration-200"
                    >
                        <div className="space-y-2 group hover:bg-[#272B30] rounded-xl transition-colors duration-300 p-2 -m-2">
                            <img
                                src={preview.image}
                                alt={preview.title}
                                className="w-full h-32 object-cover rounded-lg border border-white/10"
                            />
                            <div>
                                <p className="font-semibold text-sm text-white">{preview.title}</p>
                                <p className="text-white/70 text-xs">{preview.description}</p>
                            </div>
                        </div>
                    </motion.div>
                </HoverCard.Content>
            )}
        </HoverCard.Root>
    );
};

export default ListItemWithPreview;