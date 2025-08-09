import React from 'react';
import { JobType, CustomerJobType } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface JobTypeSelectionProps {
  allJobTypes: JobType[];
  selectedJobTypes: CustomerJobType[];
  onJobTypeCheckChange: (jobId: number, checked: boolean) => void;
  onJobTypeRemarkChange: (jobId: number, remarks: string) => void;
}

const JobTypeSelection = ({ allJobTypes, selectedJobTypes, onJobTypeCheckChange, onJobTypeRemarkChange }: JobTypeSelectionProps) => {
  return (
    <div className="table-responsive-wrapper">
      <Table className="erp-table">
        <TableHeader>
          <TableRow>
            <TableHead>Job Type</TableHead>
            <TableHead style={{ width: '120px', textAlign: 'center' }}>Select</TableHead>
            <TableHead>Remarks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allJobTypes.map((jobType) => {
            const isSelected = selectedJobTypes.some(sjt => sjt.jobId === jobType.jobId);
            const currentRemarks = selectedJobTypes.find(sjt => sjt.jobId === jobType.jobId)?.remarks || '';

            return (
              <TableRow key={jobType.jobId}>
                <TableCell className="font-medium">{jobType.jobTypeName}</TableCell>
                <TableCell className="text-center">
                  <Checkbox
                    id={`job-type-${jobType.jobId}`}
                    checked={isSelected}
                    onCheckedChange={(checked) => onJobTypeCheckChange(jobType.jobId, checked === true)}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="text"
                    className="erp-form-input"
                    placeholder="Add remarks..."
                    disabled={!isSelected}
                    value={currentRemarks}
                    onChange={(e) => onJobTypeRemarkChange(jobType.jobId, e.target.value)}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default JobTypeSelection;