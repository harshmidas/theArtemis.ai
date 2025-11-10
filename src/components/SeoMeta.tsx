import React from "react";
import { Helmet } from "react-helmet-async";
import { useSeoConfig } from "../context/SeoConfigContext";

const SeoMeta: React.FC = () => {
  const { config, loading } = useSeoConfig();
  if (loading || !config) return null;

  const { seoConfig } = config;
  const { metaTitle, metaDescription, metaKeywords, ogImage, twitterCard, canonicalUrl, favicon } = seoConfig;
console.log("SeoMeta config:", seoConfig);
console.log("SeoMeta render:", { loading, config });

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords.join(", ")} />
      <link rel="canonical" href={canonicalUrl} />

      <meta name="robots" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:title" content={metaTitle||"harshfsjdlkfajslk dfjlk jlk"} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Favicon */}
      <link rel="icon" href={favicon} type="image/png" />
    </Helmet>
  );
};

export default SeoMeta;
