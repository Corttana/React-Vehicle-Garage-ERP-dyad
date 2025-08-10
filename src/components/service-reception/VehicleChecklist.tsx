import React from 'react';
import { VehicleChecklistItemState } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface VehicleChecklistProps {
  items: VehicleChecklistItemState[];
  onItemChange: (itemId: number, updatedItem: Partial<VehicleChecklistItemState>) => void;
}

const VehicleChecklist = ({ items, onItemChange }: VehicleChecklistProps) => {
  const handleStatusChange = (itemId: number, checked: boolean) => {
    onItemChange(itemId, { isChecked: checked ? 'Y' : 'N' });
  };

  const handleRemarksChange = (itemId: number, remarks: string) => {
    onItemChange(itemId, { remarks });
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
            <TableRow key={item.itemId}>
              <TableCell className="font-medium">{item.itemName}</TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={`status-${item.itemId}`}
                    checked={item.isChecked === 'Y'}
                    onCheckedChange={(checked) => handleStatusChange(item.itemId, checked === true)}
                  />
                  <Label htmlFor={`status-${item.itemId}`} className="cursor-pointer">
                    {item.isChecked === 'Y' ? 'OK' : 'Not OK'}
                  </Label>
                </div>
              </TableCell>
              <TableCell>
                <Input
                  type="text"
                  className="erp-form-input"
                  placeholder="Add remarks if needed..."
                  value={item.remarks}
                  onChange={(e) => handleRemarksChange(item.itemId, e.target.value)}
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