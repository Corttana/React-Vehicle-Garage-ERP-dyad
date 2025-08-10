import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ServiceReceptionCreationPayload, ServiceDetail } from "@/lib/types";

interface SaveConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  data: ServiceReceptionCreationPayload;
  serviceDetails: ServiceDetail[];
}

const ConfirmationItem = ({ label, value }: { label: string, value?: React.ReactNode }) => {
  if (!value && value !== 0) return null;
  return (
    <div className="flex justify-between text-sm">
      <span className="font-medium text-muted-foreground">{label}:</span>
      <span className="font-semibold text-right">{value}</span>
    </div>
  );
};

const SaveConfirmationDialog = ({ isOpen, onClose, onConfirm, data, serviceDetails }: SaveConfirmationDialogProps) => {
  const totalAmount = serviceDetails.reduce((sum, d) => sum + (d.qty * d.rate), 0);
  const checkedItemsCount = data.vehicleChecklist?.filter(item => item.isChecked === 'Y').length || 0;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Your Entry</AlertDialogTitle>
          <AlertDialogDescription>
            Please review the details below before saving.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 my-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="space-y-2">
            <h4 className="font-bold text-md mb-2 border-b pb-1">Customer & Vehicle</h4>
            <ConfirmationItem label="Order Date" value={data.docDate} />
            <ConfirmationItem label="Customer Name" value={data.customerName} />
            <ConfirmationItem label="Mobile No" value={data.mobileNo} />
            <ConfirmationItem label="Vehicle No" value={data.vehicleNo} />
            <ConfirmationItem label="VINO" value={data.vino} />
            <ConfirmationItem label="Odometer" value={data.odometerReading} />
            <ConfirmationItem label="Vehicle Account" value={data.vehicleAccount} />
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-md mb-2 border-b pb-1">Service Details</h4>
            <ConfirmationItem label="Address" value={data.address} />
            <ConfirmationItem label="Building/Zone/Street" value={[data.building, data.zone, data.street].filter(Boolean).join(', ')} />
            <ConfirmationItem label="Brought By" value={data.broughtBy} />
            <ConfirmationItem label="Car Wash" value={data.carWash === 'Y' ? 'Yes' : 'No'} />
            <ConfirmationItem label="Status" value={data.status} />
          </div>
          <div className="md:col-span-2 space-y-2 mt-4">
             <h4 className="font-bold text-md mb-2 border-b pb-1">Summary</h4>
            <ConfirmationItem label="Service Items" value={serviceDetails.length} />
            <ConfirmationItem label="Job Types Selected" value={data.jobTypes?.length || 0} />
            <ConfirmationItem label="Checklist Items OK" value={checkedItemsCount} />
            <div className="flex justify-between border-t pt-2 mt-2">
              <span className="font-bold text-lg">Total Amount:</span>
              <span className="font-bold text-lg">{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirm & Save</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SaveConfirmationDialog;