
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ServicesTableProps {
  services: any[];
  onEdit: (service: any) => void;
  onDelete: (service: any) => void;
}

export const ServicesTable: React.FC<ServicesTableProps> = ({
  services,
  onEdit,
  onDelete
}) => {
  const { isGeorgian } = useLanguage();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>{isGeorgian ? 'სურათი' : 'Image'}</TableHead>
          <TableHead>{isGeorgian ? 'სათაური' : 'Title'}</TableHead>
          <TableHead>{isGeorgian ? 'აღწერა' : 'Description'}</TableHead>
          <TableHead>{isGeorgian ? 'თარიღი' : 'Date'}</TableHead>
          <TableHead className="text-right">{isGeorgian ? 'მოქმედებები' : 'Actions'}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service) => (
          <TableRow key={service.id}>
            <TableCell>
              {service.image_url ? (
                <img 
                  src={service.image_url} 
                  alt={service.title_en}
                  className="w-12 h-12 object-cover rounded"
                />
              ) : (
                <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                  N/A
                </div>
              )}
            </TableCell>
            <TableCell className="font-medium">
              {isGeorgian ? service.title_ka : service.title_en}
            </TableCell>
            <TableCell className="max-w-md truncate">
              {isGeorgian ? service.description_ka : service.description_en}
            </TableCell>
            <TableCell>{new Date(service.created_at).toLocaleDateString()}</TableCell>
            <TableCell className="text-right">
              <Button variant="outline" size="sm" className="mr-2" onClick={() => onEdit(service)}>
                <Pencil className="mr-2 h-4 w-4" />
                {isGeorgian ? 'რედაქტირება' : 'Edit'}
              </Button>
              <Button variant="destructive" size="sm" onClick={() => onDelete(service)}>
                <Trash2 className="mr-2 h-4 w-4" />
                {isGeorgian ? 'წაშლა' : 'Delete'}
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
