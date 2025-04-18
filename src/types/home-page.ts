
export interface HomePageData {
  hero_title_en: string;
  hero_title_ka: string;
  hero_subtitle_en: string;
  hero_subtitle_ka: string;
  hero_image_url: string;
  services_title_en: string;
  services_title_ka: string;
  projects_title_en: string;
  projects_title_ka: string;
  projects_description_en: string;
  projects_description_ka: string;
  projects_image_url: string;
  contact_title_en: string;
  contact_title_ka: string;
  contact_description_en: string;
  contact_description_ka: string;
}

export interface Service {
  id: string;
  title_en: string;
  title_ka: string;
  description_en: string;
  description_ka: string;
  image_url: string;
}
