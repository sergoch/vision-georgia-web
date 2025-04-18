
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
      const bucketPath = urlParts[urlParts.length - 2];
      const filePath = `${bucketPath}/${fileName}`;
      
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
