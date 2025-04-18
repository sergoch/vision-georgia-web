
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

const FooterAdminContent = () => {
  const { isGeorgian } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: footerData, isLoading } = useQuery({
    queryKey: ['admin-footer'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('footer')
        .select('*')
        .single();
      
      if (error && error.code !== 'PGRST116') throw error; // Not found is OK for first run
      return data || null;
    },
  });

  const [formData, setFormData] = useState({
    company_name_en: '',
    company_name_ka: '',
    company_id: '',
    address_en: '',
    address_ka: '',
    email: '',
    phone: '',
    bank_code_en: '',
    bank_code_ka: '',
    account_number_en: '',
    account_number_ka: '',
    facebook_url: '',
    twitter_url: '',
    instagram_url: '',
  });

  // Populate form data when footerData loads
  useEffect(() => {
    if (footerData) {
      setFormData({
        company_name_en: footerData.company_name_en || '',
        company_name_ka: footerData.company_name_ka || '',
        company_id: footerData.company_id || '',
        address_en: footerData.address_en || '',
        address_ka: footerData.address_ka || '',
        email: footerData.email || '',
        phone: footerData.phone || '',
        bank_code_en: footerData.bank_code_en || '',
        bank_code_ka: footerData.bank_code_ka || '',
        account_number_en: footerData.account_number_en || '',
        account_number_ka: footerData.account_number_ka || '',
        facebook_url: footerData.facebook_url || '',
        twitter_url: footerData.twitter_url || '',
        instagram_url: footerData.instagram_url || '',
      });
    } else {
      // Default values for new footer
      setFormData({
        company_name_en: 'Real Vision LLC',
        company_name_ka: 'შპს „რეალ ვიჟენი"',
        company_id: '445684536',
        address_en: 'Tamar Mepe Avenue #15, Batumi 6000',
        address_ka: 'თამარ მეფის გამზირი #15, ბათუმი 6000',
        email: 'info@rvision.ge',
        phone: '+995 322 00 00 00',
        bank_code_en: 'BAGAGE22',
        bank_code_ka: 'BAGAGE22',
        account_number_en: 'GE08BG0000000541535273',
        account_number_ka: 'GE08BG0000000541535273',
        facebook_url: 'https://facebook.com',
        twitter_url: 'https://twitter.com',
        instagram_url: 'https://instagram.com',
      });
    }
  }, [footerData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let result;
      
      if (footerData?.id) {
        // Update existing footer
        result = await supabase
          .from('footer')
          .update({
            company_name_en: formData.company_name_en,
            company_name_ka: formData.company_name_ka,
            company_id: formData.company_id,
            address_en: formData.address_en,
            address_ka: formData.address_ka,
            email: formData.email,
            phone: formData.phone,
            bank_code_en: formData.bank_code_en,
            bank_code_ka: formData.bank_code_ka,
            account_number_en: formData.account_number_en,
            account_number_ka: formData.account_number_ka,
            facebook_url: formData.facebook_url,
            twitter_url: formData.twitter_url,
            instagram_url: formData.instagram_url,
          })
          .eq('id', footerData.id)
          .select();
      } else {
        // Insert new footer
        result = await supabase
          .from('footer')
          .insert({
            company_name_en: formData.company_name_en,
            company_name_ka: formData.company_name_ka,
            company_id: formData.company_id,
            address_en: formData.address_en,
            address_ka: formData.address_ka,
            email: formData.email,
            phone: formData.phone,
            bank_code_en: formData.bank_code_en,
            bank_code_ka: formData.bank_code_ka,
            account_number_en: formData.account_number_en,
            account_number_ka: formData.account_number_ka,
            facebook_url: formData.facebook_url,
            twitter_url: formData.twitter_url,
            instagram_url: formData.instagram_url,
          })
          .select();
      }

      if (result.error) throw result.error;

      toast({
        description: isGeorgian ? 'ფუტერი წარმატებით განახლდა' : 'Footer updated successfully',
      });

      // Invalidate queries to refetch the updated data
      queryClient.invalidateQueries({ queryKey: ['footer'] });
      queryClient.invalidateQueries({ queryKey: ['admin-footer'] });
    } catch (error: any) {
      console.error('Error updating footer:', error);
      toast({
        variant: 'destructive',
        title: isGeorgian ? 'შეცდომა' : 'Error',
        description: error.message,
      });
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div>{isGeorgian ? 'იტვირთება...' : 'Loading...'}</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">
          {isGeorgian ? 'ფუტერის რედაქტირება' : 'Edit Footer'}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Info */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isGeorgian ? 'კომპანიის ინფორმაცია' : 'Company Information'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company_name_en">Company Name (English)</Label>
                <Input
                  id="company_name_en"
                  name="company_name_en"
                  value={formData.company_name_en}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company_name_ka">Company Name (Georgian)</Label>
                <Input
                  id="company_name_ka"
                  name="company_name_ka"
                  value={formData.company_name_ka}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company_id">Company ID</Label>
                <Input
                  id="company_id"
                  name="company_id"
                  value={formData.company_id}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isGeorgian ? 'საკონტაქტო ინფორმაცია' : 'Contact Information'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="address_en">Address (English)</Label>
                <Input
                  id="address_en"
                  name="address_en"
                  value={formData.address_en}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address_ka">Address (Georgian)</Label>
                <Input
                  id="address_ka"
                  name="address_ka"
                  value={formData.address_ka}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Bank Info */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isGeorgian ? 'საბანკო რეკვიზიტები' : 'Bank Information'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bank_code_en">Bank Code (English)</Label>
                <Input
                  id="bank_code_en"
                  name="bank_code_en"
                  value={formData.bank_code_en}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bank_code_ka">Bank Code (Georgian)</Label>
                <Input
                  id="bank_code_ka"
                  name="bank_code_ka"
                  value={formData.bank_code_ka}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account_number_en">Account Number (English)</Label>
                <Input
                  id="account_number_en"
                  name="account_number_en"
                  value={formData.account_number_en}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="account_number_ka">Account Number (Georgian)</Label>
                <Input
                  id="account_number_ka"
                  name="account_number_ka"
                  value={formData.account_number_ka}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">
              {isGeorgian ? 'სოციალური მედია' : 'Social Media'}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="facebook_url">Facebook URL</Label>
                <Input
                  id="facebook_url"
                  name="facebook_url"
                  value={formData.facebook_url}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter_url">Twitter URL</Label>
                <Input
                  id="twitter_url"
                  name="twitter_url"
                  value={formData.twitter_url}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram_url">Instagram URL</Label>
                <Input
                  id="instagram_url"
                  name="instagram_url"
                  value={formData.instagram_url}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            {isGeorgian ? 'შენახვა' : 'Save Changes'}
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
};

const FooterAdmin = () => {
  return (
    <LanguageProvider>
      <FooterAdminContent />
    </LanguageProvider>
  );
};

export default FooterAdmin;
