import React, { useState, FormEvent, useEffect, useMemo } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ErpLayout from '@/components/layout/ErpLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Check, Trash2, X, Plus, FilePenLine, Upload, Ban } from 'lucide-react';
import VehicleRegistrationModal from '@/components/service-reception/VehicleRegistrationModal';
import CustomerAccountModal from '@/components/service-reception/CustomerAccountModal';
import { showLoading, showSuccess, showError, dismissToast } from '@/utils/toast';
import { getServiceReceptionByDocCode, createServiceReception, updateServiceReception } from '@/lib/api';
import { ServiceReception, ServiceDetail } from '@/lib/types';

type FormData = Omit<ServiceReception, 'docCode' | 'totalAmount'>;
type DetailFormData = Omit<ServiceDetail, 'id' | 'amount'>;

const initialDetailState: DetailFormData = {
  itemcode: '',
  description: '',
  unit: '',
  qty: 1,
  rate: 0,
  customer_complaint: '',
  scope_of_work: '',
  remarks: '',
};

const ServiceReceptionFormPage = () => {
  const navigate = useNavigate();
  const { docCode } = useParams<{ docCode: string }>();
  const [isVehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [isCustomerModalOpen, setCustomerModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('customer');
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    docDate: new Date().toISOString().substring(0, 10),
    mobileNo: '', customerName: '', address: '', building: '', zone: '', street: '',
    vehicleAccount: '', vino: '', odometerReading: '', status: 'Pending',
    broughtBy: 'Owner', carWash: 'N', vehicleNo: '',
  });

  const [serviceDetails, setServiceDetails] = useState<ServiceDetail[]>([]);
  const [detailInput, setDetailInput] = useState<DetailFormData>(initialDetailState);
  const [editingDetailId, setEditingDetailId] = useState<number | null>(null);
  const [nextDetailId, setNextDetailId] = useState(1);

  useEffect(() => {
    if (docCode) {
      setIsEditMode(true);
      const fetchReception = async () => {
        const data = await getServiceReceptionByDocCode(docCode);
        if (data) {
          const { docCode: _, totalAmount: __, ...formData } = data;
          setFormData(formData);
          // In a real app, you'd fetch details too. Here we'll leave it empty.
        } else {
          showError('Service reception not found.');
          navigate('/service-reception');
        }
      };
      fetchReception();
    }
  }, [docCode, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (key: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value as any }));
  };

  const handleCheckboxChange = (checked: boolean | 'indeterminate') => {
    setFormData(prev => ({ ...prev, carWash: checked === true ? 'Y' : 'N' }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const toastId = showLoading(isEditMode ? 'Updating record...' : 'Creating record...');
    const totalAmount = serviceDetails.reduce((sum, d) => sum + d.amount, 0);
    const payload = { ...formData, totalAmount, serviceDetails }; // Include details in payload

    try {
      if (isEditMode && docCode) {
        await updateServiceReception(docCode, payload);
      } else {
        await createServiceReception(payload);
      }
      dismissToast(toastId);
      showSuccess(`Service reception ${isEditMode ? 'updated' : 'created'} successfully!`);
      navigate('/service-reception');
    } catch (error) {
      dismissToast(toastId);
      showError('An error occurred.');
    }
  };

  const handleDetailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, type } = e.target;
    setDetailInput(prev => ({ ...prev, [id]: type === 'number' ? parseFloat(value) || 0 : value }));
  };

  const handleDetailFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!detailInput.itemcode || !detailInput.description) {
      showError("Item Code and Description are required.");
      return;
    }

    if (editingDetailId !== null) {
      // Update existing detail
      setServiceDetails(details => details.map(d => d.id === editingDetailId ? { ...detailInput, id: d.id, amount: detailInput.qty * detailInput.rate } : d));
    } else {
      // Add new detail
      const newDetail: ServiceDetail = {
        ...detailInput,
        id: nextDetailId,
        amount: detailInput.qty * detailInput.rate,
      };
      setServiceDetails(details => [...details, newDetail]);
      setNextDetailId(id => id + 1);
    }
    
    setDetailInput(initialDetailState);
    setEditingDetailId(null);
  };

  const handleEditDetail = (id: number) => {
    const detailToEdit = serviceDetails.find(d => d.id === id);
    if (detailToEdit) {
      const { id: _, amount: __, ...editableFields } = detailToEdit;
      setDetailInput(editableFields);
      setEditingDetailId(id);
    }
  };

  const handleDeleteDetail = (id: number) => {
    setServiceDetails(details => details.filter(d => d.id !== id));
  };

  const cancelEdit = () => {
    setDetailInput(initialDetailState);
    setEditingDetailId(null);
  };

  const totalAmount = useMemo(() => {
    return serviceDetails.reduce((sum, d) => sum + d.amount, 0);
  }, [serviceDetails]);

  return (
    <ErpLayout>
      <div id="form-container" className="erp-container">
        <div className="form-header">
          <div className="form-header-left">
            <Link to="/service-reception"><Button type="button" className="btn btn-secondary" title="Back to List (Esc)"><ArrowLeft className="h-4 w-4" /> Back to List</Button></Link>
            <h2>{isEditMode ? `Edit Service Reception: ${docCode}` : 'New Service Reception'}</h2>
          </div>
          <div className="form-header-actions">
            <Button type="submit" form="customerVehicleForm" className="btn btn-success" title="Save (Ctrl+S)"><Check className="h-4 w-4" /> Save</Button>
            <Button type="button" className="btn btn-danger" title="Delete (Ctrl+D)" disabled={!isEditMode}><Trash2 className="h-4 w-4" /> Delete</Button>
            <Button type="button" className="btn btn-warning" title="Cancel (Esc)" onClick={() => navigate('/service-reception')}><X className="h-4 w-4" /> Cancel</Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} id="erp-tabs">
          <TabsList>
            <TabsTrigger value="customer" title="Alt+1">Customer Registration</TabsTrigger>
            <TabsTrigger value="job-type" title="Alt+2">Job Type</TabsTrigger>
            <TabsTrigger value="vehicle-checklist" title="Alt+3">Vehicle Check List</TabsTrigger>
            <TabsTrigger value="checklist-images" title="Alt+4">Check List Images</TabsTrigger>
          </TabsList>

          <TabsContent value="customer">
            <div className="erp-section-header">Customer and Vehicle Details</div>
            <form id="customerVehicleForm" className="erp-grid" noValidate onSubmit={handleSubmit}>
              {/* Main form fields... */}
              <div className="erp-form-group"><Label className="erp-form-label" htmlFor="serviceOrderNo">Service Order No</Label><Input type="text" id="serviceOrderNo" className="erp-form-input" readOnly value={isEditMode ? docCode : 'Generating...'} /></div>
              <div className="erp-form-group"><Label className="erp-form-label" htmlFor="docDate">Order Date</Label><Input type="date" id="docDate" className="erp-form-input" value={formData.docDate} onChange={handleInputChange} /></div>
              <div className="erp-form-group"><Label className="erp-form-label" htmlFor="vehicleNo">Vehicle No</Label><div className="input-with-button"><Input type="text" id="vehicleNo" className="erp-form-input" value={formData.vehicleNo} onChange={handleInputChange} /><button type="button" className="erp-add-btn" title="Register New Vehicle" onClick={() => setVehicleModalOpen(true)}>+</button></div></div>
              <div className="erp-form-group"><Label className="erp-form-label" htmlFor="vehicleAccount">Vehicle Account</Label><div className="input-with-button"><Input type="text" id="vehicleAccount" className="erp-form-input" value={formData.vehicleAccount} onChange={handleInputChange} /><button type="button" className="erp-add-btn" title="Register New Customer" onClick={() => setCustomerModalOpen(true)}>+</button></div></div>
              <div className="erp-form-group"><Label className="erp-form-label" htmlFor="customerName">Customer Name</Label><Input type="text" id="customerName" className="erp-form-input" value={formData.customerName} onChange={handleInputChange} /></div>
              <div className="erp-form-group"><Label className="erp-form-label" htmlFor="vino">VINO</Label><Input type="text" id="vino" className="erp-form-input" value={formData.vino} onChange={handleInputChange} /></div>
              <div className="erp-form-group"><Label className="erp-form-label" htmlFor="odometerReading">Odometer Reading</Label><Input type="number" id="odometerReading" className="erp-form-input" value={formData.odometerReading} onChange={handleInputChange} /></div>
              <div className="erp-form-group"><Label className="erp-form-label" htmlFor="address">Address</Label><Textarea id="address" className="erp-form-input" rows={1} value={formData.address} onChange={handleInputChange} /></div>
              <div className="erp-form-group"><Label className="erp-form-label" htmlFor="building">Building</Label><Input type="text" id="building" className="erp-form-input" value={formData.building} onChange={handleInputChange} /></div>
              <div className="erp-form-group"><Label className="erp-form-label" htmlFor="zone">Zone</Label><Input type="text" id="zone" className="erp-form-input" value={formData.zone} onChange={handleInputChange} /></div>
              <div className="erp-form-group"><Label className="erp-form-label" htmlFor="street">Street</Label><Input type="text" id="street" className="erp-form-input" value={formData.street} onChange={handleInputChange} /></div>
              <div className="erp-form-group"><Label className="erp-form-label" htmlFor="mobileNo">Mobile No</Label><Input type="tel" id="mobileNo" className="erp-form-input" value={formData.mobileNo} onChange={handleInputChange} /></div>
              <div className="erp-form-group"><Label className="erp-form-label" htmlFor="status">Status</Label><Select value={formData.status} onValueChange={(v) => handleSelectChange('status', v)}><SelectTrigger id="status" className="erp-form-input"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Pending">Pending</SelectItem><SelectItem value="In Progress">In Progress</SelectItem><SelectItem value="Completed">Completed</SelectItem><SelectItem value="Cancelled">Cancelled</SelectItem></SelectContent></Select></div>
              <div className="erp-form-group"><Label className="erp-form-label" htmlFor="broughtBy">Brought By</Label><Select value={formData.broughtBy} onValueChange={(v) => handleSelectChange('broughtBy', v)}><SelectTrigger id="broughtBy" className="erp-form-input"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="Owner">Owner</SelectItem><SelectItem value="Driver">Driver</SelectItem><SelectItem value="Friend">Friend</SelectItem></SelectContent></Select></div>
              <div className="erp-form-group checkbox-group"><Checkbox id="carWash" checked={formData.carWash === 'Y'} onCheckedChange={handleCheckboxChange} /><Label htmlFor="carWash" className="erp-form-label font-normal">Car Wash</Label></div>
            </form>

            <div id="service-details">
              <div className="erp-section-header">Service Details</div>
              <form id="erpDetailForm" className="erp-form-row" noValidate onSubmit={handleDetailFormSubmit}>
                <div className="erp-form-group itemcode"><Label htmlFor="itemcode" className="erp-form-label">Item Code</Label><Input type="text" id="itemcode" className="erp-form-input" value={detailInput.itemcode} onChange={handleDetailInputChange} required /></div>
                <div className="erp-form-group description"><Label htmlFor="description" className="erp-form-label">Description</Label><Input type="text" id="description" className="erp-form-input" value={detailInput.description} onChange={handleDetailInputChange} required /></div>
                <div className="erp-form-group unit"><Label htmlFor="unit" className="erp-form-label">Unit</Label><Input type="text" id="unit" className="erp-form-input" value={detailInput.unit} onChange={handleDetailInputChange} /></div>
                <div className="erp-form-group qty"><Label htmlFor="qty" className="erp-form-label">Qty</Label><Input type="number" id="qty" className="erp-form-input" value={detailInput.qty} onChange={handleDetailInputChange} required /></div>
                <div className="erp-form-group rate"><Label htmlFor="rate" className="erp-form-label">Rate</Label><Input type="number" id="rate" className="erp-form-input" value={detailInput.rate} onChange={handleDetailInputChange} required /></div>
                <div className="erp-form-group customer_complaint"><Label htmlFor="customer_complaint" className="erp-form-label">Customer Complaint</Label><Input type="text" id="customer_complaint" className="erp-form-input" value={detailInput.customer_complaint} onChange={handleDetailInputChange} /></div>
                <div className="erp-form-group scope_of_work"><Label htmlFor="scope_of_work" className="erp-form-label">Scope of Work</Label><Input type="text" id="scope_of_work" className="erp-form-input" value={detailInput.scope_of_work} onChange={handleDetailInputChange} /></div>
                <div className="erp-form-group remarks"><Label htmlFor="remarks" className="erp-form-label">Remarks</Label><Input type="text" id="remarks" className="erp-form-input" value={detailInput.remarks} onChange={handleDetailInputChange} /></div>
                <button type="submit" className="erp-add-btn" title={editingDetailId ? "Update Detail" : "Add Detail (Ctrl+Enter)"}>{editingDetailId ? <Check size={16}/> : <Plus size={16}/>}</button>
                {editingDetailId && <button type="button" onClick={cancelEdit} className="erp-add-btn" style={{background: '#f0ad4e'}} title="Cancel Edit"><Ban size={16}/></button>}
              </form>
              <div className="table-responsive-wrapper">
                <Table className="erp-table" id="tblServiceDetailsBody">
                  <TableHeader><TableRow><TableHead>SL</TableHead><TableHead>Item Code</TableHead><TableHead>Description</TableHead><TableHead>Unit</TableHead><TableHead>Qty</TableHead><TableHead>Rate</TableHead><TableHead>Amount</TableHead><TableHead>Complaint</TableHead><TableHead>Scope</TableHead><TableHead>Remarks</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
                  <TableBody>
                    {serviceDetails.map((detail, index) => (
                      <TableRow key={detail.id}>
                        <TableCell>{index + 1}</TableCell><TableCell>{detail.itemcode}</TableCell><TableCell>{detail.description}</TableCell><TableCell>{detail.unit}</TableCell><TableCell>{detail.qty}</TableCell><TableCell>{detail.rate.toFixed(2)}</TableCell><TableCell>{detail.amount.toFixed(2)}</TableCell><TableCell>{detail.customer_complaint}</TableCell><TableCell>{detail.scope_of_work}</TableCell><TableCell>{detail.remarks}</TableCell>
                        <TableCell className="action-cell">
                          <button className="action-btn" onClick={() => handleEditDetail(detail.id)}><FilePenLine size={14} /></button>
                          <button className="action-btn" onClick={() => handleDeleteDetail(detail.id)}><Trash2 size={14} /></button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div id="totalAmount" className="total-line">Total: <span>{totalAmount.toFixed(2)}</span></div>
            </div>
            {/* Other sections... */}
          </TabsContent>
          {/* Other TabsContent... */}
        </Tabs>
      </div>
      <VehicleRegistrationModal isOpen={isVehicleModalOpen} onClose={() => setVehicleModalOpen(false)} />
      <CustomerAccountModal isOpen={isCustomerModalOpen} onClose={() => setCustomerModalOpen(false)} />
    </ErpLayout>
  );
};

export default ServiceReceptionFormPage;