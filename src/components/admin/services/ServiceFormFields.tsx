
import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ServiceFormFieldsProps {
  form: UseFormReturn<any>;
  errors: any;
}

export const ServiceFormFields: React.FC<ServiceFormFieldsProps> = ({
  form,
  errors
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title_en">Title (English)</Label>
          <Input 
            id="title_en"
            {...form.register('title_en', { required: 'Title in English is required' })}
          />
          {errors.title_en && (
            <p className="text-sm text-destructive">{errors.title_en.message?.toString()}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="title_ka">Title (Georgian)</Label>
          <Input 
            id="title_ka"
            {...form.register('title_ka', { required: 'Title in Georgian is required' })}
          />
          {errors.title_ka && (
            <p className="text-sm text-destructive">{errors.title_ka.message?.toString()}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="description_en">Description (English)</Label>
          <Textarea 
            id="description_en"
            {...form.register('description_en', { required: 'Description in English is required' })}
          />
          {errors.description_en && (
            <p className="text-sm text-destructive">{errors.description_en.message?.toString()}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="description_ka">Description (Georgian)</Label>
          <Textarea 
            id="description_ka"
            {...form.register('description_ka', { required: 'Description in Georgian is required' })}
          />
          {errors.description_ka && (
            <p className="text-sm text-destructive">{errors.description_ka.message?.toString()}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="full_description_en">Full Description (English)</Label>
          <Textarea 
            id="full_description_en"
            {...form.register('full_description_en', { required: 'Full description in English is required' })}
          />
          {errors.full_description_en && (
            <p className="text-sm text-destructive">{errors.full_description_en.message?.toString()}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="full_description_ka">Full Description (Georgian)</Label>
          <Textarea 
            id="full_description_ka"
            {...form.register('full_description_ka', { required: 'Full description in Georgian is required' })}
          />
          {errors.full_description_ka && (
            <p className="text-sm text-destructive">{errors.full_description_ka.message?.toString()}</p>
          )}
        </div>
      </div>
    </>
  );
};
