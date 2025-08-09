import { ServiceReception } from '@/types/service-reception';

const mockReceptions: ServiceReception[] = [
  {
    id: '1',
    soNumber: 'SO-001',
    date: '2024-07-29',
    customerName: 'John Doe',
    vehicleNo: 'ABC-1234',
    status: 'Completed',
    totalAmount: 350.00,
    broughtBy: 'Owner',
    carWash: true,
  },
  {
    id: '2',
    soNumber: 'SO-002',
    date: '2024-07-28',
    customerName: 'Jane Smith',
    vehicleNo: 'XYZ-5678',
    status: 'In Progress',
    totalAmount: 120.50,
    broughtBy: 'Driver',
  },
  {
    id: '3',
    soNumber: 'SO-003',
    date: '2024-07-27',
    customerName: 'Peter Jones',
    vehicleNo: 'QWE-9101',
    status: 'Pending',
    totalAmount: 0.00,
    broughtBy: 'Friend',
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getServiceReceptions = async (): Promise<ServiceReception[]> => {
  await delay(500);
  return [...mockReceptions];
};

export const getServiceReceptionById = async (id: string): Promise<ServiceReception | undefined> => {
  await delay(300);
  return mockReceptions.find(r => r.id === id);
};

export const saveServiceReception = async (reception: Omit<ServiceReception, 'id' | 'soNumber' | 'status'> & { id?: string, status: 'Pending' | 'Approved' }): Promise<ServiceReception> => {
  await delay(500);
  if (reception.id) {
    // Update existing
    const index = mockReceptions.findIndex(r => r.id === reception.id);
    if (index !== -1) {
      mockReceptions[index] = { ...mockReceptions[index], ...reception };
      return mockReceptions[index];
    }
  }
  // Create new
  const newReception: ServiceReception = {
    ...reception,
    id: (mockReceptions.length + 1).toString(),
    soNumber: `SO-00${mockReceptions.length + 1}`,
    status: reception.status,
  };
  mockReceptions.push(newReception);
  return newReception;
};