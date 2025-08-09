import React from 'react';
import { VehicleChecklistItem } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface VehicleChecklistProps {
  items: VehicleChecklistItem[];
  onItemChange: (id: number, updatedItem: Partial<VehicleChecklistItem>) => void;
}

const VehicleChecklist = ({ items, onItemChange }: VehicleChecklistProps) => {
  const handleStatusChange = (id: number, status: 'OK' | 'Not OK' | 'N/A') => {
    onItemChange(id, { status });
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
            <TableHead style={{ width: '250px' }}>Status</TableHead>
            <TableHead>Remarks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>
                <RadioGroup
                  value={item.status}
                  className="flex items-center gap-4"
                  onValueChange={(value) => handleStatusChange(item.id, value as any)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="OK" id={`status-ok-${item.id}`} />
                    <Label htmlFor={`status-ok-${item.id}`}>OK</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Not OK" id={`status-notok-${item.id}`} />
                    <Label htmlFor={`status-notok-${item.id}`}>Not OK</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="N/A" id={`status-na-${item.id}`} />
                    <Label htmlFor={`status-na-${item.id}`}>N/A</Label>
                  </div>
                </RadioGroup>
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