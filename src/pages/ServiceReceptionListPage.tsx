import React from 'react';
import { Link } from 'react-router-dom';
import ErpLayout from '@/components/layout/ErpLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, FilePenLine, Trash2, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

const ServiceReceptionListPage = () => {
  const serviceReceptions = [
    { id: 'SR-001', date: '2023-10-26', vehicleNo: 'V-1234', customer: 'John Doe', status: 'Completed' },
    { id: 'SR-002', date: '2023-10-25', vehicleNo: 'V-5678', customer: 'Jane Smith', status: 'In Progress' },
    { id: 'SR-003', date: '2023-10-24', vehicleNo: 'V-9012', customer: 'Peter Jones', status: 'Pending' },
    { id: 'SR-004', date: '2023-10-23', vehicleNo: 'V-4567', customer: 'Sam Wilson', status: 'Completed' },
    { id: 'SR-005', date: '2023-10-22', vehicleNo: 'V-8901', customer: 'Mary Johnson', status: 'Cancelled' },
  ];

  return (
    <ErpLayout>
      <div className="erp-container">
        <div className="list-header">
          <h1 className="list-title">Service Reception</h1>
          <Link to="/service-reception/new">
            <Button className="btn btn-primary">
              <Plus className="h-4 w-4" /> Create New
            </Button>
          </Link>
        </div>

        <div className="list-filters">
          <div className="search-wrapper">
            <Search className="lucide" />
            <Input type="text" placeholder="Search records..." className="erp-form-input" />
          </div>
        </div>

        <div className="table-responsive-wrapper">
          <Table className="erp-table">
            <TableHeader>
              <TableRow>
                <TableHead>Service Order No</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Vehicle No</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead style={{ width: '100px', textAlign: 'center' }}>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {serviceReceptions.map((reception) => (
                <TableRow key={reception.id}>
                  <TableCell>{reception.id}</TableCell>
                  <TableCell>{reception.date}</TableCell>
                  <TableCell>{reception.vehicleNo}</TableCell>
                  <TableCell>{reception.customer}</TableCell>
                  <TableCell>{reception.status}</TableCell>
                  <TableCell className="action-cell">
                    <Link to={`/service-reception/edit/${reception.id}`}>
                      <button className="action-btn" title="Edit">
                        <FilePenLine size={14} />
                      </button>
                    </Link>
                    <button className="action-btn" title="Delete">
                      <Trash2 size={14} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="list-footer">
          <div className="rows-per-page-selector">
            <label htmlFor="rows-per-page">Rows per page:</label>
            <Select defaultValue="10">
              <SelectTrigger id="rows-per-page" className="erp-form-input" style={{width: '80px', height: '30px'}}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div id="pagination-info">Showing 1 to 5 of 5 entries</div>
          <div className="pagination-controls">
            <button className="btn-page-nav disabled" title="First Page"><ChevronsLeft size={16} /></button>
            <button className="btn-page-nav disabled" title="Previous Page"><ChevronLeft size={16} /></button>
            <button className="btn-page active">1</button>
            <button className="btn-page-nav disabled" title="Next Page"><ChevronRight size={16} /></button>
            <button className="btn-page-nav disabled" title="Last Page"><ChevronsRight size={16} /></button>
          </div>
        </div>
      </div>
    </ErpLayout>
  );
};

export default ServiceReceptionListPage;