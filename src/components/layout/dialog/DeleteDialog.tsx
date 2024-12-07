import React from 'react';
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';

interface DeleteDialogProps {
  open: boolean;
  handleOpen: () => void;
  handleDelete: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, handleOpen, handleDelete }) => {
  return (
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader>Confirm Deletion</DialogHeader>
      <DialogBody>
        Are you sure you want to delete this article? This action cannot be undone.
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={handleOpen} className="mr-1">
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="green" onClick={handleDelete}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteDialog;
