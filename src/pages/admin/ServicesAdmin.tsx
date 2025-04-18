
import { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { useLanguage, LanguageProvider } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Component that uses the language hook
const ServicesAdminContent = () => {
  const { isGeorgian } = useLanguage();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">
            {isGeorgian ? 'სერვისები' : 'Services'}
          </h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            {isGeorgian ? 'ახალი სერვისი' : 'New Service'}
          </Button>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{isGeorgian ? 'სათაური' : 'Title'}</TableHead>
              <TableHead>{isGeorgian ? 'აღწერა' : 'Description'}</TableHead>
              <TableHead className="text-right">{isGeorgian ? 'მოქმედებები' : 'Actions'}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Add service rows here once we have the services table */}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};

// Main ServicesAdmin component that provides the language context
const ServicesAdmin = () => {
  return (
    <LanguageProvider>
      <ServicesAdminContent />
    </LanguageProvider>
  );
};

export default ServicesAdmin;
