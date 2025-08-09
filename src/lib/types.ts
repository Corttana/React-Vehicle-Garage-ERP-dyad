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
  // Optional properties for related data, makes payload handling easier
  serviceDetails?: ServiceDetail[];
  receptionRemarks?: ServiceReceptionRemark[];
  jobTypes?: CustomerJobType[];
}

export interface ServiceDetail {
  id: number; // Temporary client-side ID
  itemcode: string;
  description: string;
  unit: string;
  qty: number;
  rate: number;
  amount: number;
  customer_complaint: string;
  scope_of_work: string;
  remarks: string;
}

export interface ServiceReceptionRemark {
  id: number; // Temporary client-side ID for list management
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