import React, { useState, FormEvent, useEffect, useCallback } from 'react';
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
import { ArrowLeft, Check, Trash2, X, Plus, FilePenLine, Upload } from 'lucide-react';
import VehicleRegistrationModal from '@/components/service-reception/VehicleRegistrationModal';
import CustomerAccountModal from '@/components/service-reception/CustomerAccountModal';
import { showLoading, showSuccess, showError, dismissToast } from '@/utils/toast';
import { getServiceReceptionById, createServiceReception, updateServiceReception, ServiceReception } from '@/lib/api';

type FormData = Omit<ServiceReception, 'id' | 'totalAmount'>;

const ServiceReceptionFormPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isVehicleModalOpen, setVehicleModalOpen] = useState(false);
  const [isCustomerModalOpen, setCustomerModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('customer');
  const [isEditMode, setIsEditMode] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    docDate: new Date().toISOString().substring(0, 10),
    mobileNo: '',
    customerName: '',
    address: '',
    building: '',
    zone: '',
    street: '',
    vehicleAccount: '',
    vino: '',
    odometerReading: '',
    status: 'Pending',
    broughtBy: 'Owner',
    carWash: 'N',
    vehicleNo: '',
  });

  useEffect(() => {
    if (id) {
      setIsEditMode(true);
      const fetchReception = async () => {
        const data = await getServiceReceptionById(id);
        if (data) {
          const { id: _, totalAmount: __, ...formData } = data;
          setFormData(formData);
        } else {
          showError('Service reception not found.');
          navigate('/service-reception');
        }
      };
      fetchReception();
    }
  }, [id, navigate]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && (event.key === 's' || event.key === 'S')) {
        event.preventDefault();
        document.getElementById('btn-save-form')?.click();
      }
      if (event.ctrlKey && (event.key === 'd' || event.key === 'D')) {
        event.preventDefault();
        document.getElementById('btn-delete-form')?.click();
      }
      if (event.key === 'Escape') {
        event.preventDefault();
        navigate('/service-reception');
      }
      if (event.altKey) {
        switch (event.key) {
          case '1': event.preventDefault(); setActiveTab('customer'); break;
          case '2': event.preventDefault(); setActiveTab('job-type'); break;
          case '3': event.preventDefault(); setActiveTab('vehicle-checklist'); break;
          case '4': event.preventDefault(); setActiveTab('checklist-images'); break;
          case 'i': case 'I': event.preventDefault(); document.getElementById('itemcode')?.focus(); break;
        }
      }
      if (event.ctrlKey && event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('btn-add-detail')?.click();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

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
    
    try {
      if (isEditMode && id) {
        await updateServiceReception(id, formData);
      } else {
        await createServiceReception(formData);
      }
      dismissToast(toastId);
      showSuccess(`Service reception ${isEditMode ? 'updated' : 'created'} successfully!`);
      navigate('/service-reception');
    } catch (error) {
      dismissToast(toastId);
      showError('An error occurred.');
    }
  };

  const serviceDetails = [
    { id: 1, itemCode: 'SRV-001', description: 'Oil Change', unit: 'PCS', qty: 1, rate: 50.00, amount: 50.00, complaint: 'Routine check', scope: 'Replace oil and filter', remarks: 'N/A' },
    { id: 2, itemCode: 'SRV-002', description: 'Tire Rotation', unit: 'PCS', qty: 4, rate: 10.00, amount: 40.00, complaint: 'Vibration at high speed', scope: 'Rotate and balance tires', remarks: 'Front tires worn' },
  ];

  const receptionRemarks = [
    { id: 1, remark: 'Customer requested a quick check of the brakes.' },
    { id: 2, remark: 'Vehicle has a small dent on the right fender.' },
  ];

  return (
    <ErpLayout>
      <div id="form-container" className="erp-container">
        <div className="form-header">
          <div className="form-header-left">
            <Link to="/service-reception">
              <Button type="button" id="btn-back-to-list" className="btn btn-secondary" title="Back to List (Esc)">
                <ArrowLeft className="h-4 w-4" /> Back to List
              </Button>
            </Link>
            <h2 id="form-title">{isEditMode ? `Edit Service Reception: ${id}` : 'New Service Reception'}</h2>
          </div>
          <div className="form-header-actions">
            <Button type="submit" id="btn-save-form" form="customerVehicleForm" className="btn btn-success" title="Save (Ctrl+S)">
              <Check className="h-4 w-4" /> Save
            </Button>
            <Button type="button" id="btn-delete-form" className="btn btn-danger" title="Delete (Ctrl+D)" disabled={!isEditMode}>
              <Trash2 className="h-4 w-4" /> Delete
            </Button>
            <Button type="button" id="btn-cancel-form" className="btn btn-warning" title="Cancel and return to list (Esc)" onClick={() => navigate('/service-reception')}>
              <X className="h-4 w-4" /> Cancel
            </Button>
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
              <div className="erp-form-group">
                <Label className="erp-form-label" htmlFor="serviceOrderNo">Service Order No</Label>
                <Input type="text" id="serviceOrderNo" className="erp-form-input" readOnly value={isEditMode ? id : 'Generating...'} />
              </div>
              <div className="erp-form-group">
                <Label className="erp-form-label" htmlFor="docDate">Order Date</Label>
                <Input type="date" id="docDate" className="erp-form-input" value={formData.docDate} onChange={handleInputChange} />
              </div>
              <div className="erp-form-group">
                <Label className="erp-form-label" htmlFor="vehicleNo">Vehicle No</Label>
                <div className="input-with-button">
                  <Input type="text" id="vehicleNo" className="erp-form-input" placeholder="Enter Vehicle No" value={formData.vehicleNo} onChange={handleInputChange} />
                  <button type="button" id="btn-add-vehicle" className="erp-add-btn" title="Register New Vehicle" onClick={() => setVehicleModalOpen(true)}>+</button>
                </div>
              </div>
              <div className="erp-form-group">
                <Label className="erp-form-label" htmlFor="vehicleAccount">Vehicle Account</Label>
                <div className="input-with-button">
                  <Input type="text" id="vehicleAccount" className="erp-form-input" placeholder="Enter Vehicle Account" value={formData.vehicleAccount} onChange={handleInputChange} />
                  <button type="button" id="btn-add-customer" className="erp-add-btn" title="Register New Customer Account" onClick={() => setCustomerModalOpen(true)}>+</button>
                </div>
              </div>
              <div className="erp-form-group">
                <Label className="erp-form-label" htmlFor="customerName">Customer Name</Label>
                <Input type="text" id="customerName" className="erp-form-input" value={formData.customerName} onChange={handleInputChange} />
              </div>
              <div className="erp-form-group">
                <Label className="erp-form-label" htmlFor="vino">VINO</Label>
                <Input type="text" id="vino" className="erp-form-input" value={formData.vino} onChange={handleInputChange} />
              </div>
              <div className="erp-form-group">
                <Label className="erp-form-label" htmlFor="odometerReading">Odometer Reading</Label>
                <Input type="number" id="odometerReading" className="erp-form-input" min="0" value={formData.odometerReading} onChange={handleInputChange} />
              </div>
              <div className="erp-form-group">
                <Label className="erp-form-label" htmlFor="address">Address</Label>
                <Textarea id="address" className="erp-form-input" rows={1} value={formData.address} onChange={handleInputChange} />
              </div>
              <div className="erp-form-group">
                <Label className="erp-form-label" htmlFor="building">Building</Label>
                <Input type="text" id="building" className="erp-form-input" value={formData.building} onChange={handleInputChange} />
              </div>
              <div className="erp-form-group">
                <Label className="erp-form-label" htmlFor="zone">Zone</Label>
                <Input type="text" id="zone" className="erp-form-input" value={formData.zone} onChange={handleInputChange} />
              </div>
              <div className="erp-form-group">
                <Label className="erp-form-label" htmlFor="street">Street</Label>
                <Input type="text" id="street" className="erp-form-input" value={formData.street} onChange={handleInputChange} />
              </div>
              <div className="erp-form-group">
                <Label className="erp-form-label" htmlFor="mobileNo">Mobile No</Label>
                <Input type="tel" id="mobileNo" className="erp-form-input" maxLength={15} value={formData.mobileNo} onChange={handleInputChange} />
              </div>
              <div className="erp-form-group">
                <Label className="erp-form-label" htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
                  <SelectTrigger id="status" className="erp-form-input"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="Pending">Pending</SelectItem><SelectItem value="In Progress">In Progress</SelectItem><SelectItem value="Completed">Completed</SelectItem><SelectItem value="Cancelled">Cancelled</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="erp-form-group">
                <Label className="erp-form-label" htmlFor="broughtBy">Brought By</Label>
                <Select value={formData.broughtBy} onValueChange={(value) => handleSelectChange('broughtBy', value)}>
                  <SelectTrigger id="broughtBy" className="erp-form-input"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="Owner">Owner</SelectItem><SelectItem value="Driver">Driver</SelectItem><SelectItem value="Friend">Friend</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="erp-form-group checkbox-group">
                <Checkbox id="carWash" checked={formData.carWash === 'Y'} onCheckedChange={handleCheckboxChange} />
                <Label htmlFor="carWash" className="erp-form-label font-normal">Car Wash</Label>
              </div>
            </form>

            <div id="service-details">
              <div className="erp-section-header">Service Details</div>
              <form id="erpDetailForm" className="erp-form-row" noValidate>
                <div className="erp-form-group itemcode"><Label htmlFor="itemcode" className="erp-form-label">Item Code</Label><Input type="text" id="itemcode" className="erp-form-input" required /></div>
                <div className="erp-form-group description"><Label htmlFor="description" className="erp-form-label">Description</Label><Input type="text" id="description" className="erp-form-input" required /></div>
                <div className="erp-form-group unit"><Label htmlFor="unit" className="erp-form-label">Unit</Label><Input type="text" id="unit" className="erp-form-input" required /></div>
                <div className="erp-form-group qty"><Label htmlFor="qty" className="erp-form-label">Qty</Label><Input type="number" id="qty" className="erp-form-input" defaultValue="1" required /></div>
                <div className="erp-form-group rate"><Label htmlFor="rate" className="erp-form-label">Rate</Label><Input type="number" id="rate" className="erp-form-input" defaultValue="0.00" required /></div>
                <div className="erp-form-group customer_complaint"><Label htmlFor="customer_complaint" className="erp-form-label">Customer Complaint</Label><Input type="text" id="customer_complaint" className="erp-form-input" /></div>
                <div className="erp-form-group scope_of_work"><Label htmlFor="scope_of_work" className="erp-form-label">Scope of Work</Label><Input type="text" id="scope_of_work" className="erp-form-input" /></div>
                <div className="erp-form-group remarks"><Label htmlFor="remarks" className="erp-form-label">Remarks</Label><Input type="text" id="remarks" className="erp-form-input" /></div>
                <button type="submit" id="btn-add-detail" className="erp-add-btn" title="Add Detail (Ctrl+Enter)">+</button>
              </form>
              <div className="table-responsive-wrapper">
                <Table className="erp-table" id="tblServiceDetailsBody">
                  <TableHeader>
                    <TableRow>
                      <TableHead>SL No</TableHead><TableHead>Item Code</TableHead><TableHead>Description</TableHead><TableHead>Unit</TableHead><TableHead>Qty</TableHead><TableHead>Rate</TableHead><TableHead>Amount</TableHead><TableHead>Customer Complaint</TableHead><TableHead>Scope of Work</TableHead><TableHead>Remarks</TableHead><TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {serviceDetails.map((detail, index) => (
                      <TableRow key={detail.id}>
                        <TableCell>{index + 1}</TableCell><TableCell>{detail.itemCode}</TableCell><TableCell>{detail.description}</TableCell><TableCell>{detail.unit}</TableCell><TableCell>{detail.qty}</TableCell><TableCell>{detail.rate.toFixed(2)}</TableCell><TableCell>{detail.amount.toFixed(2)}</TableCell><TableCell>{detail.complaint}</TableCell><TableCell>{detail.scope}</TableCell><TableCell>{detail.remarks}</TableCell>
                        <TableCell className="action-cell"><button className="action-btn"><FilePenLine size={14} /></button><button className="action-btn"><Trash2 size={14} /></button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              <div id="totalAmount" className="total-line">Total: <span>{serviceDetails.reduce((sum, d) => sum + d.amount, 0).toFixed(2)}</span></div>
            </div>

            <div id="reception-remarks-section">
              <div className="erp-section-header">Reception Remarks</div>
              <form id="remarkEntryForm" className="erp-form-row" noValidate>
                <div className="erp-form-group" style={{ flexGrow: 1 }}><Label htmlFor="txtRemark" className="erp-form-label">Remark</Label><Input type="text" id="txtRemark" className="erp-form-input" maxLength={500} required /></div>
                <button type="submit" className="erp-add-btn" title="Add Remark">+</button>
              </form>
              <div className="table-responsive-wrapper">
                <Table className="erp-table">
                  <TableHeader><TableRow><TableHead>SL No</TableHead><TableHead>Remark</TableHead><TableHead style={{ width: '70px' }}>Actions</TableHead></TableRow></TableHeader>
                  <TableBody id="tblRemarksBody">
                    {receptionRemarks.map((remark, index) => (
                      <TableRow key={remark.id}>
                        <TableCell>{index + 1}</TableCell><TableCell>{remark.remark}</TableCell>
                        <TableCell className="action-cell"><button className="action-btn"><Trash2 size={14} /></button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="job-type">
            <div className="erp-section-header">Job Type Selection</div>
            <div className="table-responsive-wrapper">
              <Table className="erp-table" id="tblJobTypes">
                <TableHeader><TableRow><TableHead>Job Type</TableHead><TableHead>Select</TableHead><TableHead>Remarks</TableHead></TableRow></TableHeader>
                <TableBody>
                  <TableRow><TableCell>Periodic Maintenance</TableCell><TableCell><Checkbox /></TableCell><TableCell><Input className="erp-form-input" /></TableCell></TableRow>
                  <TableRow><TableCell>Running Repair</TableCell><TableCell><Checkbox /></TableCell><TableCell><Input className="erp-form-input" /></TableCell></TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="modal-footer" style={{ textAlign: 'left', paddingTop: '15px' }}><Button type="button" id="btn-save-job-types" className="btn btn-success">Save Job Types</Button></div>
          </TabsContent>

          <TabsContent value="vehicle-checklist">
            <div className="erp-section-header">Vehicle Check List</div>
            <div className="table-responsive-wrapper">
              <Table className="erp-table" id="tblVehicleChecklist">
                <TableHeader><TableRow><TableHead>Item</TableHead><TableHead>✓</TableHead><TableHead>Notes / Issues Found</TableHead></TableRow></TableHeader>
                <TableBody>
                  <TableRow><TableCell>Headlights</TableCell><TableCell><Checkbox /></TableCell><TableCell><Input className="erp-form-input" /></TableCell></TableRow>
                  <TableRow><TableCell>Tire Pressure</TableCell><TableCell><Checkbox /></TableCell><TableCell><Input className="erp-form-input" /></TableCell></TableRow>
                </TableBody>
              </Table>
            </div>
            <div className="modal-footer" style={{ textAlign: 'left', paddingTop: '15px' }}><Button type="button" id="btn-save-checklist" className="btn btn-success">Save Checklist</Button></div>
          </TabsContent>

          <TabsContent value="checklist-images">
            <div className="erp-section-header">Check List Images</div>
            <div className="erp-grid" style={{ gridTemplateColumns: '1fr auto', alignItems: 'flex-end' }}>
              <div className="erp-form-group" style={{flexDirection: 'column', alignItems: 'start'}}>
                <Label className="erp-form-label" style={{textAlign: 'left', width: 'auto'}} htmlFor="imageUploadInput">Upload Images</Label>
                <Input type="file" id="imageUploadInput" className="erp-form-input" multiple accept="image/*" />
              </div>
              <div className="erp-form-group add-button">
                <Button type="button" id="btn-upload-image" className="btn btn-primary" style={{ height: '28px' }}>
                  <Upload className="h-4 w-4 mr-2" /> Upload
                </Button>
              </div>
            </div>
            <div id="checklist-images-container" style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px', border: '1px dashed #ccc', padding: '10px', minHeight: '100px' }}>
              <p style={{ color: '#888', width: '100%', textAlign: 'center' }}>No images uploaded yet.</p>
            </div>
            <div className="modal-footer" style={{ textAlign: 'left', paddingTop: '15px' }}><Button type="button" id="btn-print-checklist" className="btn btn-primary">Print Checklist</Button></div>
          </TabsContent>
        </Tabs>
      </div>
      <VehicleRegistrationModal isOpen={isVehicleModalOpen} onClose={() => setVehicleModalOpen(false)} />
      <CustomerAccountModal isOpen={isCustomerModalOpen} onClose={() => setCustomerModalOpen(false)} />
    </ErpLayout>
  );
};

export default ServiceReceptionFormPage;