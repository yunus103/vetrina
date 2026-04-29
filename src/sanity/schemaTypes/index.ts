import { seoType } from "./objects/seo";
import { socialLinkType } from "./objects/socialLink";
import { siteSettingsType } from "./singletons/siteSettings";
import { navigationType } from "./singletons/navigation";
import { homePageType } from "./singletons/homePage";
import { aboutPageType } from "./singletons/aboutPage";
import { contactPageType } from "./singletons/contactPage";
import { referansPageType } from "./singletons/referansPage";
import { blogPostType } from "./documents/blogPost";
import { serviceType } from "./documents/service";
import { projectType } from "./documents/project";
import { legalPageType } from "./documents/legalPage";
import { blogCategoryType } from "./documents/blogCategory";
import { faqType } from "./documents/faq";
import { referansType } from "./documents/referans";

export const schemaTypes = [
  // Objects
  seoType,
  socialLinkType,
  // Singletons
  siteSettingsType,
  navigationType,
  homePageType,
  aboutPageType,
  contactPageType,
  referansPageType,
  // Collections
  blogCategoryType,
  blogPostType,
  serviceType,
  projectType,
  legalPageType,
  faqType,
  referansType,
];
