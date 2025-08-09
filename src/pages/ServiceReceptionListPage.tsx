import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ErpLayout from '@/components/layout/ErpLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Search, FilePenLine, Trash2, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import { getServiceReceptions, deleteServiceReception } from '@/lib/api';
import { ServiceReception } from '@/lib/types';
import { showLoading, showSuccess, showError, dismissToast } from '@/utils/toast';
import ConfirmationDialog from '@/components/common/ConfirmationDialog';
import { Skeleton } from '@/components/ui/skeleton';

const ServiceReceptionListPage = () => {
  const navigate = useNavigate();
  const [receptions, setReceptions] = useState<ServiceReception[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const fetchReceptions = useCallback(async () => {
    setLoading(true);
    const data = await getServiceReceptions();
    setReceptions(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchReceptions();
  }, [fetchReceptions]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'n') {
        event.preventDefault();
        navigate('/service-reception/new');
      }
      if (event.key === '/') {
        event.preventDefault();
        document.getElementById('list-search-input')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setIsDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;
    const toastId = showLoading('Deleting record...');
    const success = await deleteServiceReception(selectedId);
    dismissToast(toastId);
    if (success) {
      showSuccess('Record deleted successfully.');
      fetchReceptions();
    } else {
      showError('Failed to delete record.');
    }
    setIsDialogOpen(false);
    setSelectedId(null);
  };

  return (
    <ErpLayout>
      <div className="erp-container">
        <div className="list-header">
          <h1 className="list-title">Service Reception</h1>
          <Link to="/service-reception/new">
            <Button className="btn btn-primary" title="Create New (N)">
              <Plus className="h-4 w-4" /> Create New
            </Button>
          </Link>
        </div>

        <div className="list-filters">
          <div className="search-wrapper">
            <Search className="lucide" />
            <Input id="list-search-input" type="text" placeholder="Search records... (/)" className="erp-form-input" />
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
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={6}><Skeleton className="h-5 w-full" /></TableCell>
                  </TableRow>
                ))
              ) : (
                receptions.map((reception) => (
                  <TableRow key={reception.id}>
                    <TableCell>{reception.id}</TableCell>
                    <TableCell>{reception.docDate}</TableCell>
                    <TableCell>{reception.vehicleNo}</TableCell>
                    <TableCell>{reception.customerName}</TableCell>
                    <TableCell>{reception.status}</TableCell>
                    <TableCell className="action-cell">
                      <Link to={`/service-reception/edit/${reception.id}`}>
                        <button className="action-btn" title="Edit"><FilePenLine size={14} /></button>
                      </Link>
                      <button className="action-btn" title="Delete" onClick={() => handleDeleteClick(reception.id)}>
                        <Trash2 size={14} />
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="list-footer">
          <div className="rows-per-page-selector">
            <label htmlFor="rows-per-page">Rows per page:</label>
            <Select defaultValue="10">
              <SelectTrigger id="rows-per-page" className="erp-form-input" style={{width: '80px', height: '30px'}}><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem><SelectItem value="20">20</SelectItem><SelectItem value="50">50</SelectItem><SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div id="pagination-info">Showing 1 to {receptions.length} of {receptions.length} entries</div>
          <div className="pagination-controls">
            <button className="btn-page-nav disabled" title="First Page"><ChevronsLeft size={16} /></button>
            <button className="btn-page-nav disabled" title="Previous Page"><ChevronLeft size={16} /></button>
            <button className="btn-page active">1</button>
            <button className="btn-page-nav disabled" title="Next Page"><ChevronRight size={16} /></button>
            <button className="btn-page-nav disabled" title="Last Page"><ChevronsRight size={16} /></button>
          </div>
        </div>
      </div>
      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Are you sure?"
        description="This action cannot be undone. This will permanently delete the service reception record."
      />
    </ErpLayout>
  );
};

export default ServiceReceptionListPage;