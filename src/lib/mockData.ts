export interface ServiceReception {
  id: string;
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

export let serviceReceptions: ServiceReception[] = [
  { id: 'SR-001', docDate: '2023-10-26', vehicleNo: 'V-1234', customerName: 'John Doe', status: 'Completed', mobileNo: '555-0101', address: '123 Oak St', building: 'A', zone: '1', street: 'Main', vehicleAccount: 'CUST-001', vino: 'VIN123', odometerReading: '50000', broughtBy: 'Owner', carWash: 'Y', totalAmount: 250.00 },
  { id: 'SR-002', docDate: '2023-10-25', vehicleNo: 'V-5678', customerName: 'Jane Smith', status: 'In Progress', mobileNo: '555-0102', address: '456 Pine St', building: 'B', zone: '2', street: 'Elm', vehicleAccount: 'CUST-002', vino: 'VIN456', odometerReading: '75000', broughtBy: 'Driver', carWash: 'N', totalAmount: 150.50 },
  { id: 'SR-003', docDate: '2023-10-24', vehicleNo: 'V-9012', customerName: 'Peter Jones', status: 'Pending', mobileNo: '555-0103', address: '789 Maple St', building: 'C', zone: '3', street: 'Birch', vehicleAccount: 'CUST-003', vino: 'VIN789', odometerReading: '120000', broughtBy: 'Friend', carWash: 'Y', totalAmount: 75.00 },
  { id: 'SR-004', docDate: '2023-10-23', vehicleNo: 'V-4567', customerName: 'Sam Wilson', status: 'Completed', mobileNo: '555-0104', address: '321 Cedar St', building: 'D', zone: '4', street: 'Spruce', vehicleAccount: 'CUST-004', vino: 'VIN321', odometerReading: '90000', broughtBy: 'Owner', carWash: 'N', totalAmount: 500.75 },
  { id: 'SR-005', docDate: '2023-10-22', vehicleNo: 'V-8901', customerName: 'Mary Johnson', status: 'Cancelled', mobileNo: '555-0105', address: '654 Willow St', building: 'E', zone: '5', street: 'Ash', vehicleAccount: 'CUST-005', vino: 'VIN654', odometerReading: '30000', broughtBy: 'Driver', carWash: 'Y', totalAmount: 50.00 },
];