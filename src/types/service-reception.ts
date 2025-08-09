export interface ServiceReception {
  id: string;
  soNumber: string;
  date: string;
  customerName: string;
  vehicleNo: string;
  status: 'Pending' | 'Approved' | 'In Progress' | 'Completed';
  totalAmount: number;
  vino?: string;
  odometer?: number;
  address?: string;
  mobile?: string;
  broughtBy?: 'Owner' | 'Driver' | 'Friend';
  carWash?: boolean;
  serviceDetails?: ServiceDetail[];
  remarks?: ReceptionRemark[];
  customerComplaint?: string;
  scopeOfWork?: string;
  receptionRemarks?: string;
}

export interface ServiceDetail {
  id?: string;
  itemCode: string;
  description: string;
  unit: string;
  qty: number;
  rate: number;
  amount: number;
}

export interface ReceptionRemark {
  id: string;
  remark: string;
}