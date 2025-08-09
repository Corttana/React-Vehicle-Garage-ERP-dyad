import React from 'react';
import { VehicleChecklistItem } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface VehicleChecklistProps {
  items: VehicleChecklistItem[];
  onItemChange: (id: number, updatedItem: Partial<VehicleChecklistItem>) => void;
}

const VehicleChecklist = ({ items, onItemChange }: VehicleChecklistProps) => {
  const handleStatusChange = (id: number, checked: boolean) => {
    onItemChange(id, { status: checked ? 'OK' : 'Not OK' });
  };

  const handleRemarksChange = (id: number, remarks: string) => {
    onItemChange(id, { remarks });
  };

  return (
    <div className="table-responsive-wrapper">
      <Table className="erp-table">
        <TableHeader>
          <TableRow>
            <TableHead>Checklist Item</TableHead>
            <TableHead style={{ width: '120px' }}>Status</TableHead>
            <TableHead>Remarks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${item.id}`}
                    checked={item.status === 'OK'}
                    onCheckedChange={(checked) => handleStatusChange(item.id, checked === true)}
                  />
                  <Label htmlFor={`status-${item.id}`} className="cursor-pointer">{item.status}</Label>
                </div>
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  className="erp-form-input"
                  placeholder="Add remarks if needed..."
                  value={item.remarks}
                  onChange={(e) => handleRemarksChange(item.id, e.target.value)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VehicleChecklist;