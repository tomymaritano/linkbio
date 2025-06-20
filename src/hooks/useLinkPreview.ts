// hooks/useLinkPreview.ts
import useSWR from 'swr';

const API_KEY = "540c6b3de380501a00d0ed8ca9908fdc";
const fetcher = (url: string) => fetch(url).then(res => res.json());

export const useLinkPreview = (url: string) => {
  const isValidUrl = !!url && /^https?:\/\//.test(url);

  const { data, error } = useSWR(
    isValidUrl ? `https://api.linkpreview.net/?key=${API_KEY}&q=${encodeURIComponent(url)}` : null,
    fetcher
  );

  return {
    data: data ?? null,
    error,
  };
};
