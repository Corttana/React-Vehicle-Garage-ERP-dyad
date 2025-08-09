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
  jobTypes?: CustomerJobType[];
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

export interface CustomerJobType {
  jobId: number;
  remarks: string;
}

export interface VehicleChecklistItem {
  id: number;
  name: string;
  status: 'OK' | 'Not OK';
  remarks: string;
}