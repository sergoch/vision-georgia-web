
export interface TeamMember {
  id: string;
  name_en: string;
  name_ka: string;
  title_en: string;
  title_ka: string;
  bio_en: string;
  bio_ka: string;
  email?: string;
  linkedin_url?: string;
  image_url: string;
  order_index: number;
}
