import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ServiceReception } from '@/types/service-reception';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save } from 'lucide-react';
import { saveServiceReception } from '@/lib/mockApi';
import { showSuccess, showError } from '@/utils/toast';

interface ServiceReceptionFormProps {
  reception: ServiceReception | null;
  onBack: () => void;
  onSaveSuccess: () => void;
}

const formSchema = z.object({
  vehicleNo: z.string().min(1, "Vehicle No is required"),
  customerName: z.string().min(1, "Customer Name is required"),
  vino: z.string().optional(),
  odometer: z.coerce.number().optional(),
  address: z.string().optional(),
  mobile: z.string().optional(),
  status: z.enum(["Pending", "Approved"]),
  broughtBy: z.enum(["Owner", "Driver", "Friend"]),
  carWash: z.boolean().default(false),
});

const ServiceReceptionForm = ({ reception, onBack, onSaveSuccess }: ServiceReceptionFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      vehicleNo: reception?.vehicleNo || '',
      customerName: reception?.customerName || '',
      vino: reception?.vino || '',
      odometer: reception?.odometer || 0,
      address: reception?.address || '',
      mobile: reception?.mobile || '',
      status: reception?.status === 'Approved' ? 'Approved' : 'Pending',
      broughtBy: reception?.broughtBy || 'Owner',
      carWash: reception?.carWash || false,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const dataToSave = {
        ...values,
        id: reception?.id,
        date: reception?.date || new Date().toISOString().split('T')[0],
        totalAmount: reception?.totalAmount || 0,
      };
      await saveServiceReception(dataToSave as any);
      showSuccess('Service Reception saved successfully!');
      onSaveSuccess();
    } catch (error) {
      showError('Failed to save Service Reception.');
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle>{reception ? 'Edit' : 'New'} Service Reception</CardTitle>
          </div>
          <Button onClick={form.handleSubmit(onSubmit)}>
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="customer">
          <TabsList>
            <TabsTrigger value="customer">Customer Registration</TabsTrigger>
            <TabsTrigger value="job-type" disabled>Job Type</TabsTrigger>
            <TabsTrigger value="checklist" disabled>Vehicle Check List</TabsTrigger>
            <TabsTrigger value="images" disabled>Check List Images</TabsTrigger>
          </TabsList>
          <TabsContent value="customer" className="mt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                      <FormLabel>Service Order No</FormLabel>
                      <Input readOnly value={reception?.soNumber || 'Generating...'} />
                  </div>
                  <div>
                      <FormLabel>Order Date</FormLabel>
                      <Input readOnly value={reception?.date || new Date().toLocaleDateString()} />
                  </div>
                  <FormField
                    control={form.control}
                    name="vehicleNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vehicle No</FormLabel>
                        <FormControl><Input placeholder="Enter Vehicle No" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="customerName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Name</FormLabel>
                        <FormControl><Input placeholder="Enter Customer Name" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="vino"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>VINO</FormLabel>
                        <FormControl><Input placeholder="Enter VINO" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="odometer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Odometer Reading</FormLabel>
                        <FormControl><Input type="number" placeholder="Enter Odometer" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Address</FormLabel>
                        <FormControl><Textarea placeholder="Enter Address" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="mobile"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mobile No</FormLabel>
                        <FormControl><Input type="tel" placeholder="Enter Mobile No" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Approved">Approved</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="broughtBy"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Brought By</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger><SelectValue placeholder="Select who brought the vehicle" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="Owner">Owner</SelectItem>
                            <SelectItem value="Driver">Driver</SelectItem>
                            <SelectItem value="Friend">Friend</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="carWash"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-end space-x-2 pb-2">
                        <FormControl><Checkbox checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                        <div className="space-y-1 leading-none"><FormLabel>Car Wash</FormLabel></div>
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ServiceReceptionForm;