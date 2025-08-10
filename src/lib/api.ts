import { serviceReceptions, jobTypes, selectedJobTypesByDocCode, vehicleChecklists, serviceDetails, receptionRemarks } from './mockData';
import { ServiceReception, JobType, CustomerJobType, SelectedJobType, ServiceReceptionCreationPayload } from './types';

const SIMULATED_DELAY = 500;

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
        const jobs = selectedJobTypesByDocCode[docCode] || [];
        const checklist = vehicleChecklists[docCode] || [];
        const details = serviceDetails[docCode] || [];
        const remarks = receptionRemarks[docCode] || [];
        resolve({ ...reception, jobTypes: jobs, vehicleChecklist: checklist, serviceDetails: details, receptionRemarks: remarks });
      } else {
        resolve(undefined);
      }
    }, SIMULATED_DELAY);
  });
};

export const createServiceReception = (data: ServiceReceptionCreationPayload): Promise<ServiceReception> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const { jobTypes: jobTypesFromForm, ...restOfData } = data;
      const newReception: ServiceReception = {
        ...restOfData,
        docCode: getNextDocCode(),
        totalAmount: 0,
      };
      serviceReceptions.unshift(newReception);
      
      if (jobTypesFromForm) {
        const jobsWithTranNo: SelectedJobType[] = jobTypesFromForm.map((job, index) => ({
          ...job,
          tranNo: index + 1,
        }));
        selectedJobTypesByDocCode[newReception.docCode] = jobsWithTranNo;
      }
      
      if (data.vehicleChecklist) {
        vehicleChecklists[newReception.docCode] = data.vehicleChecklist;
      }
      if (data.serviceDetails) {
        serviceDetails[newReception.docCode] = data.serviceDetails;
      }
      if (data.receptionRemarks) {
        receptionRemarks[newReception.docCode] = data.receptionRemarks;
      }
      resolve(newReception);
    }, SIMULATED_DELAY);
  });
};

export const updateServiceReception = (docCode: string, data: Partial<ServiceReceptionCreationPayload>): Promise<ServiceReception | null> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const index = serviceReceptions.findIndex(r => r.docCode === docCode);
      if (index !== -1) {
        const { jobTypes: jobTypesFromForm, ...restOfData } = data;
        serviceReceptions[index] = { ...serviceReceptions[index], ...restOfData };

        if (jobTypesFromForm) {
          const jobsWithTranNo: SelectedJobType[] = jobTypesFromForm.map((job, index) => ({
            ...job,
            tranNo: index + 1,
          }));
          selectedJobTypesByDocCode[docCode] = jobsWithTranNo;
        }

        if (data.vehicleChecklist) {
            vehicleChecklists[docCode] = data.vehicleChecklist;
        }
        if (data.serviceDetails) {
            serviceDetails[docCode] = data.serviceDetails;
        }
        if (data.receptionRemarks) {
            receptionRemarks[docCode] = data.receptionRemarks;
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
        delete selectedJobTypesByDocCode[docCode];
        delete vehicleChecklists[docCode];
        delete serviceDetails[docCode];
        delete receptionRemarks[docCode];
        resolve(true);
      } else {
        resolve(false);
      }
    }, SIMULATED_DELAY);
  });
};