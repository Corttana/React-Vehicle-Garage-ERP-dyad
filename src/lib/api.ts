import { serviceReceptions, ServiceReception } from './mockData';

const SIMULATED_DELAY = 500;

// Helper to generate a new ID
const getNextId = () => {
  const lastId = serviceReceptions.map(r => parseInt(r.id.split('-')[1])).sort((a, b) => b - a)[0] || 0;
  return `SR-${String(lastId + 1).padStart(3, '0')}`;
};

export const getServiceReceptions = (): Promise<ServiceReception[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...serviceReceptions]);
    }, SIMULATED_DELAY);
  });
};

export const getServiceReceptionById = (id: string): Promise<ServiceReception | undefined> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(serviceReceptions.find(r => r.id === id));
    }, SIMULATED_DELAY);
  });
};

export const createServiceReception = (data: Omit<ServiceReception, 'id' | 'totalAmount'>): Promise<ServiceReception> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newReception: ServiceReception = {
        ...data,
        id: getNextId(),
        totalAmount: 0, // Default total amount for new entries
      };
      serviceReceptions.unshift(newReception);
      resolve(newReception);
    }, SIMULATED_DELAY);
  });
};

export const updateServiceReception = (id: string, data: Partial<ServiceReception>): Promise<ServiceReception | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const index = serviceReceptions.findIndex(r => r.id === id);
      if (index !== -1) {
        serviceReceptions[index] = { ...serviceReceptions[index], ...data };
        resolve(serviceReceptions[index]);
      } else {
        resolve(null);
      }
    }, SIMULATED_DELAY);
  });
};

export const deleteServiceReception = (id: string): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const index = serviceReceptions.findIndex(r => r.id === id);
      if (index !== -1) {
        serviceReceptions.splice(index, 1);
        resolve(true);
      } else {
        resolve(false);
      }
    }, SIMULATED_DELAY);
  });
};