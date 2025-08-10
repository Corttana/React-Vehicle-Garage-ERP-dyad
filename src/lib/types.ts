export interface ServiceReception {
  docCode: string;
  docDate: string;
  vehicleNo: string;
  customerName:string;
  status: 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';
  mobileNo: string;
  address: string;
  building: string;
  zone: string;
  street: string;
  vehicleAccount: string;
  vino: string;
  odometerReading: string;
  broughtBy: 'Owner' | 'Driver' | 'Friend';
  carWash: 'Y' | 'N';
  totalAmount: number;
  serviceDetails?: ServiceDetail[];
  receptionRemarks?: ServiceReceptionRemark[];
  jobTypes?: SelectedJobType[];
  vehicleChecklist?: SelectedChecklistItem[];
}

export interface ServiceDetail {
  id: number;
  itemcode: string;
  description:string;
  unit: string;
  qty: number;
  rate: number;
  amount: number;
  customer_complaint: string;
  scope_of_work: string;
  remarks: string;
}

export interface ServiceReceptionRemark {
  id: number;
  slNo: number;
  remarks: string;
}

export interface JobType {
  jobId: number;
  jobTypeName: string;
  active: 'Y' | 'N';
}

export interface CustomerJobType {
  jobId: number;
  remarks: string;
}

export interface SelectedJobType extends CustomerJobType {
  tranNo: number;
}

export interface ChecklistMasterItem {
  itemId: number;
  itemName: string;
  active: 'Y' | 'N';
}

export interface SelectedChecklistItem {
  tranNo: number;
  itemId: number;
  isChecked: 'Y' | 'N';
  remarks: string;
}

// Type for the form's state, combining master and selected data
export type VehicleChecklistItemState = {
  itemId: number;
  itemName: string;
  isChecked: 'Y' | 'N';
  remarks: string;
  tranNo?: number;
};

export type ServiceReceptionCreationPayload = Omit<ServiceReception, 'docCode' | 'totalAmount' | 'jobTypes' | 'vehicleChecklist'> & {
  jobTypes?: (CustomerJobType & { tranNo?: number })[];
  vehicleChecklist?: VehicleChecklistItemState[];
};

export interface ChecklistImage {
  imageId: number;
  docCode: string;
  fileName: string;
  filePath: string; // In a real app, this would be a URL to the stored image
  uploadedOn: string;
}