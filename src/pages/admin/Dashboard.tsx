
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { isGeorgian } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: isGeorgian ? 'შეცდომა' : 'Error',
        description: error.message
      });
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-rvision-blue">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            {isGeorgian ? 'ადმინ პანელი' : 'Admin Dashboard'}
          </h1>
          <Button variant="secondary" onClick={handleSignOut}>
            {isGeorgian ? 'გამოსვლა' : 'Sign Out'}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">
              {isGeorgian ? 'პროექტების მართვა' : 'Manage Projects'}
            </h2>
            <Button variant="outline" className="w-full" onClick={() => navigate('/admin/projects')}>
              {isGeorgian ? 'პროექტები' : 'Projects'}
            </Button>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-6 rounded-lg border border-white/10">
            <h2 className="text-xl font-semibold text-white mb-4">
              {isGeorgian ? 'სერვისების მართვა' : 'Manage Services'}
            </h2>
            <Button variant="outline" className="w-full" onClick={() => navigate('/admin/services')}>
              {isGeorgian ? 'სერვისები' : 'Services'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
