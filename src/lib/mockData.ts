import { ServiceReception, JobType, SelectedJobType, ServiceDetail, ServiceReceptionRemark, ChecklistMasterItem, SelectedChecklistItem, ChecklistImage } from './types';

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

export let selectedJobTypesByDocCode: { [docCode: string]: SelectedJobType[] } = {
  'SR-001': [
    { tranNo: 1, jobId: 1, remarks: 'Full synthetic oil requested.' },
    { tranNo: 2, jobId: 3, remarks: 'Check front brake pads only.' },
  ],
  'SR-002': [
    { tranNo: 1, jobId: 4, remarks: 'AC not cooling effectively.' },
  ],
};

export const checklistMasterItems: ChecklistMasterItem[] = [
  { itemId: 1, itemName: 'Headlights & Taillights', active: 'Y' },
  { itemId: 2, itemName: 'Turn Signals & Hazards', active: 'Y' },
  { itemId: 3, itemName: 'Wipers & Washer Fluid', active: 'Y' },
  { itemId: 4, itemName: 'Tire Condition & Pressure', active: 'Y' },
  { itemId: 5, itemName: 'Engine Oil Level', active: 'Y' },
  { itemId: 6, itemName: 'Brake Fluid Level', active: 'Y' },
  { itemId: 7, itemName: 'Coolant Level', active: 'Y' },
  { itemId: 8, itemName: 'Horn', active: 'Y' },
  { itemId: 9, itemName: 'AC Cooling Performance', active: 'Y' },
  { itemId: 10, itemName: 'Interior Lights & Controls', active: 'Y' },
  { itemId: 11, itemName: 'Any visible scratches/dents', active: 'Y' },
  { itemId: 12, itemName: 'Spare Tire & Tools', active: 'Y' },
  { itemId: 13, itemName: 'Radio', active: 'N' }, // Inactive example
];

export let selectedChecklistsByDocCode: { [docCode: string]: SelectedChecklistItem[] } = {
  'SR-001': [
    { tranNo: 1, itemId: 1, isChecked: 'Y', remarks: '' },
    { tranNo: 2, itemId: 4, isChecked: 'N', remarks: 'Front left tire is low' },
    { tranNo: 3, itemId: 11, isChecked: 'Y', remarks: 'Minor scratch on rear bumper' },
  ],
  'SR-002': [
     { tranNo: 1, itemId: 9, isChecked: 'N', remarks: 'Not cooling at all' },
  ]
};

export let serviceDetails: { [docCode: string]: ServiceDetail[] } = {
  'SR-001': [
    { id: 1, itemcode: 'OIL-SYN', description: 'Synthetic Oil Change', unit: 'Job', qty: 1, rate: 150, amount: 150, customer_complaint: 'Regular service', scope_of_work: 'Change oil and filter', remarks: '' },
    { id: 2, itemcode: 'BRK-PAD', description: 'Brake Pad Inspection', unit: 'Job', qty: 1, rate: 50, amount: 50, customer_complaint: 'Squeaking noise', scope_of_work: 'Inspect front and rear pads', remarks: 'Front pads at 50%' },
  ]
};

export let receptionRemarks: { [docCode: string]: ServiceReceptionRemark[] } = {
  'SR-001': [
    { id: 1, slNo: 1, remarks: 'Customer is waiting for the vehicle.' },
    { id: 2, slNo: 2, remarks: 'Please check for any software updates.' },
  ]
};

export let checklistImagesByDocCode: { [docCode: string]: ChecklistImage[] } = {
  'SR-001': [
    { imageId: 1, docCode: 'SR-001', fileName: 'dent_bumper.jpg', filePath: 'https://placehold.co/600x400/EEE/31343C?text=Bumper+Dent', uploadedOn: new Date().toISOString() },
    { imageId: 2, docCode: 'SR-001', fileName: 'low_tire.jpg', filePath: 'https://placehold.co/600x400/EEE/31343C?text=Low+Tire', uploadedOn: new Date().toISOString() },
  ]
};