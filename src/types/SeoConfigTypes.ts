export interface SeoConfig {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  robotsTxt: string;
  sitemapUrl: string;
  favicon: string;
  ogImage: string;
  twitterCard: string;
  structuredData: Record<string, any>;
  indexable: boolean;
  canonicalUrl: string;
}

export interface BrandingConfig {
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  customCss: string;
  headerHtml: string;
  footerHtml: string;
  bannerImage: string;
}

export interface JobFeedConfig {
  jobCategories: string[];
  locations: string[];
  jobsPerPage: number;
  sortOrder: string;
  showSalary: boolean;
  showCompanyLogo: boolean;
  enableApply: boolean;
  applyRedirectUrl: string;
  customFilters: Record<string, string>;
}

export interface AnalyticsConfig {
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  facebookPixelId?: string;
  linkedInInsightTag?: string;
  customTracking?: Record<string, string>;
}

export interface CustomScripts {
  headerScripts: string;
  footerScripts: string;
  externalScripts: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  additionalContacts?: Record<string, string>;
}

export interface SocialLinks {
  linkedin?: string;
  facebook?: string;
  twitter?: string;
}

export interface SeoWebsite {
  _id: string;
  name: string;
  domain: string;
  baseUrl: string;
  description: string;
  active: boolean;
  seoConfig: SeoConfig;
  brandingConfig: BrandingConfig;
  jobFeedConfig: JobFeedConfig;
  analyticsConfig: AnalyticsConfig;
  customScripts: CustomScripts;
  contactInfo: ContactInfo;
  socialLinks: SocialLinks;
  metadata?: Record<string, any>;
  status: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}
