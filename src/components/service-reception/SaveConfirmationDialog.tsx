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

const SaveConfirmationDialog = ({ isOpen, onClose, onConfirm, data, serviceDetails }: SaveConfirmationDialogProps) => {
  const totalAmount = serviceDetails.reduce((sum, d) => sum + (d.qty * d.rate), 0);
  const checkedItemsCount = data.vehicleChecklist?.filter(item => item.isChecked === 'Y').length || 0;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Your Entry</AlertDialogTitle>
          <AlertDialogDescription>
            Please review the details below before saving.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="text-sm space-y-2 my-4">
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Customer Name:</span>
            <span className="font-semibold">{data.customerName || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Vehicle No:</span>
            <span className="font-semibold">{data.vehicleNo || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Service Items:</span>
            <span className="font-semibold">{serviceDetails.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Job Types Selected:</span>
            <span className="font-semibold">{data.jobTypes?.length || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-muted-foreground">Checklist Items OK:</span>
            <span className="font-semibold">{checkedItemsCount}</span>
          </div>
          <div className="flex justify-between border-t pt-2 mt-2">
            <span className="font-bold text-lg">Total Amount:</span>
            <span className="font-bold text-lg">{totalAmount.toFixed(2)}</span>
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