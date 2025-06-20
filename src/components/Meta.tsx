// src/components/Meta.tsx
import { Helmet } from "react-helmet";

type MetaProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

const defaultMeta = {
  title: "Link Bio - Tomy Maritano",
  description: "Links, proyectos y redes de Hacklab",
  image: "https://bio.hacklab.dog/og-default.png",
  url: "https://bio.hacklab.dog",
};

export default function Meta({
  title = defaultMeta.title,
  description = defaultMeta.description,
  image = defaultMeta.image,
  url = defaultMeta.url,
}: MetaProps) {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="bio.hacklab.dog" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={url} />

      <link rel="canonical" href={url} />
    </Helmet>
  );
}