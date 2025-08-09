import { useState } from 'react';
import ServiceReceptionList from '@/components/service-reception/ServiceReceptionList';
import ServiceReceptionForm from '@/components/service-reception/ServiceReceptionForm';
import { ServiceReception } from '@/types/service-reception';
import ErpLayout from '../components/layout/ErpLayout.tsx';

const ServiceReceptionPage = () => {
  const [view, setView] = useState<'list' | 'form'>('list');
  const [selectedReception, setSelectedReception] = useState<ServiceReception | null>(null);

  const handleShowForm = (reception?: ServiceReception) => {
    setSelectedReception(reception || null);
    setView('form');
  };

  const handleShowList = () => {
    setSelectedReception(null);
    setView('list');
  };

  return (
    <ErpLayout>
      <div className="erp-container bg-transparent p-0">
        {view === 'list' ? (
          <ServiceReceptionList onAddNew={() => handleShowForm()} onEdit={handleShowForm} />
        ) : (
          <ServiceReceptionForm reception={selectedReception} onBack={handleShowList} onSaveSuccess={handleShowList} />
        )}
      </div>
    </ErpLayout>
  );
};

export default ServiceReceptionPage;