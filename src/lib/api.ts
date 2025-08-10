import { serviceReceptions, jobTypes, selectedJobTypesByDocCode, checklistMasterItems, selectedChecklistsByDocCode, serviceDetails, receptionRemarks, checklistImagesByDocCode } from './mockData';
import { ServiceReception, JobType, SelectedJobType, ServiceReceptionCreationPayload, ChecklistMasterItem, SelectedChecklistItem, ChecklistImage } from './types';

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

export const getChecklistItems = (): Promise<ChecklistMasterItem[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(checklistMasterItems.filter(item => item.active === 'Y'));
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
        const checklist = selectedChecklistsByDocCode[docCode] || [];
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
      const { jobTypes: jobTypesFromForm, vehicleChecklist: checklistFromForm, ...restOfData } = data;
      const newReception: ServiceReception = {
        ...restOfData,
        docCode: getNextDocCode(),
        totalAmount: 0,
      };
      serviceReceptions.unshift(newReception);
      
      if (jobTypesFromForm) {
        const jobsWithTranNo: SelectedJobType[] = jobTypesFromForm.map((job, index) => ({
          jobId: job.jobId,
          remarks: job.remarks,
          tranNo: index + 1,
        }));
        selectedJobTypesByDocCode[newReception.docCode] = jobsWithTranNo;
      }
      
      if (checklistFromForm) {
        const checklistWithTranNo: SelectedChecklistItem[] = checklistFromForm.map((item, index) => ({
          itemId: item.itemId,
          isChecked: item.isChecked,
          remarks: item.remarks,
          tranNo: index + 1,
        }));
        selectedChecklistsByDocCode[newReception.docCode] = checklistWithTranNo;
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
        const { jobTypes: jobTypesFromForm, vehicleChecklist: checklistFromForm, ...restOfData } = data;
        serviceReceptions[index] = { ...serviceReceptions[index], ...restOfData as ServiceReception };

        if (jobTypesFromForm) {
          const jobsWithTranNo: SelectedJobType[] = jobTypesFromForm.map((job, index) => ({
            jobId: job.jobId,
            remarks: job.remarks,
            tranNo: job.tranNo || index + 1,
          }));
          selectedJobTypesByDocCode[docCode] = jobsWithTranNo;
        }

        if (checklistFromForm) {
          const checklistWithTranNo: SelectedChecklistItem[] = checklistFromForm.map((item, index) => ({
            itemId: item.itemId,
            isChecked: item.isChecked,
            remarks: item.remarks,
            tranNo: item.tranNo || index + 1,
          }));
          selectedChecklistsByDocCode[docCode] = checklistWithTranNo;
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
        delete selectedChecklistsByDocCode[docCode];
        delete serviceDetails[docCode];
        delete receptionRemarks[docCode];
        delete checklistImagesByDocCode[docCode];
        resolve(true);
      } else {
        resolve(false);
      }
    }, SIMULATED_DELAY);
  });
};

// --- Checklist Image API ---

export const getChecklistImages = (docCode: string): Promise<ChecklistImage[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(checklistImagesByDocCode[docCode] || []);
    }, SIMULATED_DELAY);
  });
};

export const uploadChecklistImage = (docCode: string, file: File): Promise<ChecklistImage> => {
  return new Promise(resolve => {
    setTimeout(() => {
      if (!checklistImagesByDocCode[docCode]) {
        checklistImagesByDocCode[docCode] = [];
      }
      const allImageIds = Object.values(checklistImagesByDocCode).flat().map(i => i.imageId);
      const newImageId = allImageIds.length > 0 ? Math.max(...allImageIds) + 1 : 1;
      
      const newImage: ChecklistImage = {
        imageId: newImageId,
        docCode,
        fileName: file.name,
        filePath: `https://placehold.co/600x400/EEE/31343C?text=${encodeURIComponent(file.name)}`,
        uploadedOn: new Date().toISOString(),
      };
      checklistImagesByDocCode[docCode].push(newImage);
      resolve(newImage);
    }, SIMULATED_DELAY * 2); // Slower delay for upload
  });
};

export const deleteChecklistImage = (imageId: number): Promise<boolean> => {
  return new Promise(resolve => {
    setTimeout(() => {
      for (const docCode in checklistImagesByDocCode) {
        const index = checklistImagesByDocCode[docCode].findIndex(img => img.imageId === imageId);
        if (index !== -1) {
          checklistImagesByDocCode[docCode].splice(index, 1);
          resolve(true);
          return;
        }
      }
      resolve(false);
    }, SIMULATED_DELAY);
  });
};