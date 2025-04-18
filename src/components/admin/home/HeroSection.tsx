import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { HomeFormData } from "@/types/home";
import { useLanguage } from "@/contexts/LanguageContext";
import { useImageDelete } from "@/hooks/use-image-delete";

interface HeroSectionProps {
  formData: HomeFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>, section: 'hero' | 'projects') => void;
  heroImageFile: File | null;
  onImageDelete: (imageType: 'hero' | 'projects') => void;
}

export const HeroSection = ({
  formData,
  handleInputChange,
  handleImageChange,
  heroImageFile,
  onImageDelete,
}: HeroSectionProps) => {
  const { isGeorgian } = useLanguage();
  const { deleteImage } = useImageDelete();

  const handleDelete = async () => {
    if (formData.hero_image_url && await deleteImage(formData.hero_image_url)) {
      onImageDelete('hero');
    }
  };

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">
        {isGeorgian ? 'გმირის სექცია' : 'Hero Section'}
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="hero_title_en">Hero Title (English)</Label>
          <Input
            id="hero_title_en"
            name="hero_title_en"
            value={formData.hero_title_en}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hero_title_ka">Hero Title (Georgian)</Label>
          <Input
            id="hero_title_ka"
            name="hero_title_ka"
            value={formData.hero_title_ka}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hero_subtitle_en">Hero Subtitle (English)</Label>
          <Textarea
            id="hero_subtitle_en"
            name="hero_subtitle_en"
            value={formData.hero_subtitle_en}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hero_subtitle_ka">Hero Subtitle (Georgian)</Label>
          <Textarea
            id="hero_subtitle_ka"
            name="hero_subtitle_ka"
            value={formData.hero_subtitle_ka}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="hero_image">Hero Image</Label>
          <div className="space-y-4">
            <Input
              id="hero_image"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'hero')}
            />
            {(formData.hero_image_url || heroImageFile) && (
              <div className="relative">
                <img 
                  src={heroImageFile ? URL.createObjectURL(heroImageFile) : formData.hero_image_url} 
                  alt="Hero Preview" 
                  className="w-full max-h-64 object-cover rounded-md border" 
                />
                {formData.hero_image_url && (
                  <Button
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
