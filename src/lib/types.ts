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