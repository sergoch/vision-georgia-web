
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useImageDelete } from "@/hooks/use-image-delete";

interface TeamMemberImageUploadProps {
  imagePreview: string;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImageDelete?: () => void;
}

export const TeamMemberImageUpload = ({ 
  imagePreview, 
  onImageChange,
  onImageDelete 
}: TeamMemberImageUploadProps) => {
  const { deleteImage } = useImageDelete();

  const handleDelete = async () => {
    if (imagePreview && await deleteImage(imagePreview) && onImageDelete) {
      onImageDelete();
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="image">Image</Label>
      <Input 
        id="image"
        type="file"
        accept="image/*"
        onChange={onImageChange}
      />
      {imagePreview && (
        <div className="relative">
          <img 
            src={imagePreview} 
            alt="Preview" 
            className="w-40 h-40 object-cover rounded-md border" 
          />
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};
