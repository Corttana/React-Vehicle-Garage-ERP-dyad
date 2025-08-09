import { serviceReceptions, jobTypes, customerJobTypes } from './mockData';
import { ServiceReception, JobType } from './types';

const SIMULATED_DELAY = 500;

// Helper to generate a new docCode
const getNextDocCode = () => {
  const lastId = serviceReceptions.map(r => parseInt(r.docCode.split('-')[1])).sort((a, b) => b - a)[0] || 0;
  return `SR-${String(lastId + 1).padStart(3, '0')}`;
};

export const getJobTypes = (): Promise<JobType[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(jobTypes.filter(jt => jt.active === 'Y'));
    }, SIMULATED_DELAY);
  });
};

export const getServiceReceptions = (): Promise<ServiceReception[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([...serviceReceptions]);
    }, SIMULATED_DELAY);
  });
};

export const getServiceReceptionByDocCode = (docCode: string): Promise<ServiceReception | undefined> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const reception = serviceReceptions.find(r => r.docCode === docCode);
      if (reception) {
        // In a real app, this would be a JOIN. Here we simulate it.
        const jobs = customerJobTypes[docCode] || [];
        resolve({ ...reception, jobTypes: jobs });
      } else {
        resolve(undefined);
      }
    }, SIMULATED_DELAY);
  });
};

export const createServiceReception = (data: Omit<ServiceReception, 'docCode' | 'totalAmount'>): Promise<ServiceReception> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const newReception: ServiceReception = {
        ...data,
        docCode: getNextDocCode(),
        totalAmount: 0, // This will be calculated from details later
      };
      serviceReceptions.unshift(newReception);
      // Save related job types
      if (data.jobTypes) {
        customerJobTypes[newReception.docCode] = data.jobTypes;
      }
      resolve(newReception);
    }, SIMULATED_DELAY);
  });
};

export const updateServiceReception = (docCode: string, data: Partial<ServiceReception>): Promise<ServiceReception | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const index = serviceReceptions.findIndex(r => r.docCode === docCode);
      if (index !== -1) {
        serviceReceptions[index] = { ...serviceReceptions[index], ...data };
        // Update related job types
        if (data.jobTypes) {
          customerJobTypes[docCode] = data.jobTypes;
        }
        resolve(serviceReceptions[index]);
      } else {
        resolve(null);
      }
    }, SIMULATED_DELAY);
  });
};

export const deleteServiceReception = (docCode: string): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const index = serviceReceptions.findIndex(r => r.docCode === docCode);
      if (index !== -1) {
        serviceReceptions.splice(index, 1);
        delete customerJobTypes[docCode]; // Also delete related job types
        resolve(true);
      } else {
        resolve(false);
      }
    }, SIMULATED_DELAY);
  });
};