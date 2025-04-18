
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { supabase } from '@/integrations/supabase/client';
import { LanguageProvider, useLanguage } from '../contexts/LanguageContext';

// Create a component that uses the language hook
const AuthContent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isGeorgian } = useLanguage();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        toast({
          title: isGeorgian ? 'წარმატებით დარეგისტრირდით' : 'Successfully signed up',
          description: isGeorgian ? 'გთხოვთ დაადასტუროთ თქვენი ელ-ფოსტა' : 'Please check your email for confirmation',
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate('/admin');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: isGeorgian ? 'შეცდომა' : 'Error',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-rvision-blue">
      <div className="container max-w-md mx-auto px-4">
        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10">
          <h1 className="text-3xl font-bold text-white mb-6">
            {isGeorgian ? 'ადმინისტრირება' : 'Admin Access'}
          </h1>
          <form onSubmit={handleAuth} className="space-y-4">
            <div>
              <Label className="text-white" htmlFor="email">
                {isGeorgian ? 'ელ-ფოსტა' : 'Email'}
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-white" htmlFor="password">
                {isGeorgian ? 'პაროლი' : 'Password'}
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                isGeorgian ? 'დაელოდეთ...' : 'Loading...'
              ) : isSignUp ? (
                isGeorgian ? 'რეგისტრაცია' : 'Sign Up'
              ) : (
                isGeorgian ? 'შესვლა' : 'Sign In'
              )}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full text-white hover:text-white hover:bg-white/10"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              {isSignUp ? (
                isGeorgian ? 'უკვე გაქვთ ანგარიში? შესვლა' : 'Already have an account? Sign In'
              ) : (
                isGeorgian ? 'არ გაქვთ ანგარიში? რეგისტრაცია' : "Don't have an account? Sign Up"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Main Auth component that provides the language context
const Auth = () => {
  return (
    <LanguageProvider>
      <AuthContent />
    </LanguageProvider>
  );
};

export default Auth;
