
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

export const useImageDelete = () => {
  const { toast } = useToast();
  const { isGeorgian } = useLanguage();

  const deleteImage = async (imageUrl: string) => {
    try {
      // Extract filename from URL
      const urlParts = imageUrl.split('/');
      const fileName = urlParts[urlParts.length - 1];
      let filePath;

      // Check if the URL contains 'site-images' to determine the correct path
      if (imageUrl.includes('site-images')) {
        // For newer uploads where bucket name is in the URL
        const bucketPath = urlParts[urlParts.length - 2];
        filePath = `${bucketPath}/${fileName}`;
      } else {
        // For older uploads or different URL format
        filePath = fileName;
      }
      
      const { error } = await supabase.storage
        .from('site-images')
        .remove([filePath]);
        
      if (error) throw error;

      toast({
        description: isGeorgian 
          ? 'სურათი წაიშალა' 
          : 'Image deleted successfully'
      });

      return true;
    } catch (error: any) {
      console.error('Error deleting image:', error);
      toast({
        variant: "destructive",
        description: error.message
      });
      return false;
    }
  };

  return { deleteImage };
};
