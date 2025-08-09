import { ServiceReception, JobType, CustomerJobType } from './types';

export let serviceReceptions: ServiceReception[] = [
  { docCode: 'SR-001', docDate: '2023-10-26', vehicleNo: 'V-1234', customerName: 'John Doe', status: 'Completed', mobileNo: '555-0101', address: '123 Oak St', building: 'A', zone: '1', street: 'Main', vehicleAccount: 'CUST-001', vino: 'VIN123', odometerReading: '50000', broughtBy: 'Owner', carWash: 'Y', totalAmount: 250.00 },
  { docCode: 'SR-002', docDate: '2023-10-25', vehicleNo: 'V-5678', customerName: 'Jane Smith', status: 'In Progress', mobileNo: '555-0102', address: '456 Pine St', building: 'B', zone: '2', street: 'Elm', vehicleAccount: 'CUST-002', vino: 'VIN456', odometerReading: '75000', broughtBy: 'Driver', carWash: 'N', totalAmount: 150.50 },
  { docCode: 'SR-003', docDate: '2023-10-24', vehicleNo: 'V-9012', customerName: 'Peter Jones', status: 'Pending', mobileNo: '555-0103', address: '789 Maple St', building: 'C', zone: '3', street: 'Birch', vehicleAccount: 'CUST-003', vino: 'VIN789', odometerReading: '120000', broughtBy: 'Friend', carWash: 'Y', totalAmount: 75.00 },
  { docCode: 'SR-004', docDate: '2023-10-23', vehicleNo: 'V-4567', customerName: 'Sam Wilson', status: 'Completed', mobileNo: '555-0104', address: '321 Cedar St', building: 'D', zone: '4', street: 'Spruce', vehicleAccount: 'CUST-004', vino: 'VIN321', odometerReading: '90000', broughtBy: 'Owner', carWash: 'N', totalAmount: 500.75 },
  { docCode: 'SR-005', docDate: '2023-10-22', vehicleNo: 'V-8901', customerName: 'Mary Johnson', status: 'Cancelled', mobileNo: '555-0105', address: '654 Willow St', building: 'E', zone: '5', street: 'Ash', vehicleAccount: 'CUST-005', vino: 'VIN654', odometerReading: '30000', broughtBy: 'Driver', carWash: 'Y', totalAmount: 50.00 },
];

export let jobTypes: JobType[] = [
  { jobId: 1, jobTypeName: 'General Service', active: 'Y' },
  { jobId: 2, jobTypeName: 'Engine Overhaul', active: 'Y' },
  { jobId: 3, jobTypeName: 'Brake System Repair', active: 'Y' },
  { jobId: 4, jobTypeName: 'AC Service & Repair', active: 'Y' },
  { jobId: 5, jobTypeName: 'Body Work & Painting', active: 'Y' },
  { jobId: 6, jobTypeName: 'Electrical System Check', active: 'Y' },
  { jobId: 7, jobTypeName: 'Tire Replacement', active: 'N' }, // Inactive example
];

// This would be your WO_CUST_JOBTYPE table in a real DB
export let customerJobTypes: { [docCode: string]: CustomerJobType[] } = {
  'SR-001': [
    { jobId: 1, remarks: 'Full synthetic oil requested.' },
    { jobId: 3, remarks: 'Check front brake pads only.' },
  ],
  'SR-002': [
    { jobId: 4, remarks: 'AC not cooling effectively.' },
  ],
};