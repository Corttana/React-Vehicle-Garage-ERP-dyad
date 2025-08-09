import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, PlusCircle } from 'lucide-react';
import { ServiceDetail } from '@/types/service-reception';

const ServiceDetailsTable = () => {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'serviceDetails',
  });

  const serviceDetailsValues = useWatch({
    name: 'serviceDetails',
    control,
  });

  const handleAddRow = () => {
    append({
      itemCode: '',
      description: '',
      unit: '',
      qty: 1,
      rate: 0,
      amount: 0,
    });
  };

  const calculateTotal = () => {
    return serviceDetailsValues?.reduce((total: number, item: ServiceDetail) => total + ((item.qty || 0) * (item.rate || 0)), 0) || 0;
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Item Code</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[80px]">Unit</TableHead>
              <TableHead className="w-[80px]">Qty</TableHead>
              <TableHead className="w-[100px]">Rate</TableHead>
              <TableHead className="w-[120px] text-right">Amount</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => {
              const qty = serviceDetailsValues?.[index]?.qty || 0;
              const rate = serviceDetailsValues?.[index]?.rate || 0;
              const amount = qty * rate;

              return (
                <TableRow key={field.id}>
                  <TableCell>
                    <Input {...register(`serviceDetails.${index}.itemCode`)} placeholder="Code" />
                  </TableCell>
                  <TableCell>
                    <Input {...register(`serviceDetails.${index}.description`)} placeholder="Service Description" />
                  </TableCell>
                  <TableCell>
                    <Input {...register(`serviceDetails.${index}.unit`)} placeholder="Unit" />
                  </TableCell>
                  <TableCell>
                    <Input type="number" {...register(`serviceDetails.${index}.qty`, { valueAsNumber: true })} placeholder="Qty" />
                  </TableCell>
                  <TableCell>
                    <Input type="number" {...register(`serviceDetails.${index}.rate`, { valueAsNumber: true })} placeholder="Rate" />
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {amount.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => remove(index)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
             {fields.length === 0 && (
                <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground">
                        No services added.
                    </TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center">
        <Button type="button" variant="outline" onClick={handleAddRow}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add Row
        </Button>
        <div className="flex items-center gap-4">
          <span className="font-semibold text-lg">Total Amount:</span>
          <span className="text-xl font-bold text-primary">${calculateTotal().toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsTable;