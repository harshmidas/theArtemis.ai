import React, { useEffect } from "react";
import { useSeoConfig } from "../context/SeoConfigContext";

const DynamicScripts: React.FC = () => {
  const { config } = useSeoConfig();
  if (!config) return null;

  const { customScripts, analyticsConfig } = config;

  useEffect(() => {
    // Load external scripts
    customScripts.externalScripts?.forEach((src) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      document.body.appendChild(script);
    });

    // Google Analytics
    if (analyticsConfig.googleAnalyticsId) {
      const ga = document.createElement("script");
      ga.async = true;
      ga.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.googleAnalyticsId}`;
      document.head.appendChild(ga);

      const inline = document.createElement("script");
      inline.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${analyticsConfig.googleAnalyticsId}');
      `;
      document.head.appendChild(inline);
    }
  }, [customScripts, analyticsConfig]);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: customScripts.headerScripts }} />
      <div dangerouslySetInnerHTML={{ __html: customScripts.footerScripts }} />
    </>
  );
};

export default DynamicScripts;
