import { useEffect, useState } from 'react';
import { getServiceReceptions } from '@/lib/mockApi';
import { ServiceReception } from '@/types/service-reception';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, PlusCircle, Search } from 'lucide-react';

interface ServiceReceptionListProps {
  onAddNew: () => void;
  onEdit: (reception: ServiceReception) => void;
}

const ServiceReceptionList = ({ onAddNew, onEdit }: ServiceReceptionListProps) => {
  const [receptions, setReceptions] = useState<ServiceReception[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchReceptions = async () => {
      setLoading(true);
      const data = await getServiceReceptions();
      setReceptions(data);
      setLoading(false);
    };
    fetchReceptions();
  }, []);

  const filteredReceptions = receptions.filter(
    (r) =>
      r.soNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.vehicleNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeVariant = (status: ServiceReception['status']): "default" | "secondary" | "outline" | "destructive" | null | undefined => {
    switch (status) {
      case 'Completed':
        return 'default';
      case 'In Progress':
        return 'secondary';
      case 'Pending':
        return 'outline';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Service Receptions</CardTitle>
          <Button onClick={onAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" /> New Service Reception
          </Button>
        </div>
        <div className="mt-4 relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by SO No, Customer, or Vehicle..."
            className="pl-8 w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>SO No</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Vehicle No</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total Amount</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={7} className="text-center">Loading...</TableCell></TableRow>
              ) : filteredReceptions.length > 0 ? (
                filteredReceptions.map((reception) => (
                  <TableRow key={reception.id}>
                    <TableCell className="font-medium">{reception.soNumber}</TableCell>
                    <TableCell>{reception.date}</TableCell>
                    <TableCell>{reception.customerName}</TableCell>
                    <TableCell>{reception.vehicleNo}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(reception.status)}>{reception.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">${reception.totalAmount.toFixed(2)}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onEdit(reception)}>Edit</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow><TableCell colSpan={7} className="text-center">No service receptions found.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceReceptionList;