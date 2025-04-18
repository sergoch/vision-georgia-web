
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { HomeFormData } from "@/types/home";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProjectsSectionProps {
  formData: HomeFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>, section: 'hero' | 'projects') => void;
  projectImageFile: File | null;
}

export const ProjectsSection = ({
  formData,
  handleInputChange,
  handleImageChange,
  projectImageFile,
}: ProjectsSectionProps) => {
  const { isGeorgian } = useLanguage();

  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">
        {isGeorgian ? 'პროექტების სექცია' : 'Projects Section'}
      </h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="projects_title_en">Projects Title (English)</Label>
          <Input
            id="projects_title_en"
            name="projects_title_en"
            value={formData.projects_title_en}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="projects_title_ka">Projects Title (Georgian)</Label>
          <Input
            id="projects_title_ka"
            name="projects_title_ka"
            value={formData.projects_title_ka}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="projects_description_en">Projects Description (English)</Label>
          <Textarea
            id="projects_description_en"
            name="projects_description_en"
            value={formData.projects_description_en}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="projects_description_ka">Projects Description (Georgian)</Label>
          <Textarea
            id="projects_description_ka"
            name="projects_description_ka"
            value={formData.projects_description_ka}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="projects_image">Projects Image</Label>
          <Input
            id="projects_image"
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 'projects')}
          />
          {(formData.projects_image_url || projectImageFile) && (
            <div className="mt-2">
              <img 
                src={projectImageFile ? URL.createObjectURL(projectImageFile) : formData.projects_image_url} 
                alt="Projects Preview" 
                className="w-full max-h-64 object-cover rounded-md border" 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
