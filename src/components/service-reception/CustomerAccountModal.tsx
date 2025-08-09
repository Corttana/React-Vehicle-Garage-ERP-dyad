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
import { Textarea } from "@/components/ui/textarea";

interface CustomerAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CustomerAccountModal = ({ isOpen, onClose }: CustomerAccountModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="modal-content" style={{ maxWidth: '700px' }}>
        <DialogHeader className="modal-header">
          <DialogTitle className="modal-title">Customer Account Registration</DialogTitle>
        </DialogHeader>
        <div className="modal-body">
          <form id="customerAccountForm" className="erp-grid">
            <div className="erp-form-group">
              <Label htmlFor="txtModalAccountName" className="erp-form-label">
                Account Name <span style={{ color: "red" }}>*</span>
              </Label>
              <Input type="text" id="txtModalAccountName" className="erp-form-input" required />
            </div>
            <div className="erp-form-group">
              <Label htmlFor="txtModalAccountPhone" className="erp-form-label">Phone No</Label>
              <Input type="tel" id="txtModalAccountPhone" className="erp-form-input" />
            </div>
            <div className="erp-form-group">
              <Label htmlFor="txtModalAccountAddress" className="erp-form-label">Address</Label>
              <Textarea id="txtModalAccountAddress" className="erp-form-input" rows={2} />
            </div>
          </form>
        </div>
        <DialogFooter className="modal-footer">
          <Button type="button" id="btn-save-customer" className="btn btn-success">Submit</Button>
          <Button type="button" className="btn btn-warning btn-close-modal" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CustomerAccountModal;