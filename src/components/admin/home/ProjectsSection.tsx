import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { HomeFormData } from "@/types/home";
import { useLanguage } from "@/contexts/LanguageContext";
import { useImageDelete } from "@/hooks/use-image-delete";

interface ProjectsSectionProps {
  formData: HomeFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>, section: 'hero' | 'projects') => void;
  projectImageFile: File | null;
  onImageDelete: (imageType: 'hero' | 'projects') => void;
}

export const ProjectsSection = ({
  formData,
  handleInputChange,
  handleImageChange,
  projectImageFile,
  onImageDelete,
}: ProjectsSectionProps) => {
  const { isGeorgian } = useLanguage();
  const { deleteImage } = useImageDelete();

  const handleDelete = async () => {
    if (formData.projects_image_url && await deleteImage(formData.projects_image_url)) {
      onImageDelete('projects');
    }
  };

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
          <div className="space-y-4">
            <Input
              id="projects_image"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageChange(e, 'projects')}
            />
            {(formData.projects_image_url || projectImageFile) && (
              <div className="relative">
                <img 
                  src={projectImageFile ? URL.createObjectURL(projectImageFile) : formData.projects_image_url} 
                  alt="Projects Preview" 
                  className="w-full max-h-64 object-cover rounded-md border" 
                />
                {formData.projects_image_url && (
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
