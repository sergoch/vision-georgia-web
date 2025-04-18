
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HomeFormData } from "@/types/home";
import { useLanguage } from "@/contexts/LanguageContext";

interface ServicesSectionProps {
  formData: HomeFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const ServicesSection = ({
  formData,
  handleInputChange,
}: ServicesSectionProps) => {
  const { isGeorgian } = useLanguage();

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">
        {isGeorgian ? 'სერვისების სექცია' : 'Services Section'}
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="services_title_en">Services Title (English)</Label>
          <Input
            id="services_title_en"
            name="services_title_en"
            value={formData.services_title_en}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="services_title_ka">Services Title (Georgian)</Label>
          <Input
            id="services_title_ka"
            name="services_title_ka"
            value={formData.services_title_ka}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  );
};
