import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface VehicleRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VehicleRegistrationModal = ({ isOpen, onClose }: VehicleRegistrationModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="modal-content" style={{ maxWidth: '700px' }}>
        <DialogHeader className="modal-header">
          <DialogTitle className="modal-title">Vehicle Registration</DialogTitle>
        </DialogHeader>
        <div className="modal-body">
          <form id="vehicleRegForm" className="erp-grid">
            <div className="erp-form-group">
              <Label htmlFor="txtModalVehicleNo" className="erp-form-label">
                Vehicle No <span style={{ color: "red" }}>*</span>
              </Label>
              <Input type="text" id="txtModalVehicleNo" className="erp-form-input" required />
            </div>
            <div className="erp-form-group">
              <Label htmlFor="txtModalVino" className="erp-form-label">VINO</Label>
              <Input type="text" id="txtModalVino" className="erp-form-input" />
            </div>
          </form>
        </div>
        <DialogFooter className="modal-footer">
          <Button type="button" id="btn-save-vehicle" className="btn btn-success">Submit</Button>
          <Button type="button" className="btn btn-warning btn-close-modal" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleRegistrationModal;