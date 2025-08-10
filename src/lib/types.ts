export interface ServiceReception {
  docCode: string;
  docDate: string;
  vehicleNo: string;
  customerName: string;
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
  vehicleChecklist?: VehicleChecklistItem[];
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

// Represents the data structure for the form state
export interface CustomerJobType {
  jobId: number;
  remarks: string;
}

// Represents the data structure in the "database" (WO_CUST_JOBTYPE)
export interface SelectedJobType extends CustomerJobType {
  tranNo: number;
}


export interface VehicleChecklistItem {
  id: number;
  name: string;
  status: 'OK' | 'Not OK';
  remarks: string;
}

// This is the type for the payload sent from the form to the API
export type ServiceReceptionCreationPayload = Omit<ServiceReception, 'docCode' | 'totalAmount' | 'jobTypes'> & {
  jobTypes?: CustomerJobType[];
};