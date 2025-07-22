// hooks/useLinkPreview.ts
import useSWR from 'swr';
import { getLinkPreview } from '../services/linkPreviewService';

export const useLinkPreview = (url: string) => {
  const isValidUrl = !!url && /^https?:\/\//.test(url);

  const { data, error } = useSWR(
    isValidUrl ? url : null,
    getLinkPreview,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // Cache for 1 minute
    }
  );

  return {
    data: data ?? null,
    error,
  };
};
