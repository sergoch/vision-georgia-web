
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HomeFormData } from "@/types/home";
import { useLanguage } from "@/contexts/LanguageContext";

interface ContactSectionProps {
  formData: HomeFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const ContactSection = ({
  formData,
  handleInputChange,
}: ContactSectionProps) => {
  const { isGeorgian } = useLanguage();

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">
        {isGeorgian ? 'კონტაქტის სექცია' : 'Contact Section'}
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contact_title_en">Contact Title (English)</Label>
          <Input
            id="contact_title_en"
            name="contact_title_en"
            value={formData.contact_title_en}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact_title_ka">Contact Title (Georgian)</Label>
          <Input
            id="contact_title_ka"
            name="contact_title_ka"
            value={formData.contact_title_ka}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact_description_en">Contact Description (English)</Label>
          <Textarea
            id="contact_description_en"
            name="contact_description_en"
            value={formData.contact_description_en}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact_description_ka">Contact Description (Georgian)</Label>
          <Textarea
            id="contact_description_ka"
            name="contact_description_ka"
            value={formData.contact_description_ka}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};
