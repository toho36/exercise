import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react';

interface IDeleteDialogProps {
  open: boolean;
  handleOpen: () => void;
  handleDelete: () => void;
}
/**
 * A functional React component that renders a modal dialog for confirming deletion actions.
 * It allows users to either confirm or cancel the deletion of an item (e.g., an article).
 *
 * The dialog includes:
 * - A header with a title.
 * - A body displaying a confirmation message.
 * - Footer buttons for "Cancel" and "Confirm".
 *
 * @param {DeleteDialogProps} props - Props for the DeleteDialog component.
 * @param {boolean} props.open - Controls whether the dialog is open.
 * @param {() => void} props.handleOpen - Toggles the dialog's open state.
 * @param {() => void} props.handleDelete - Executes the delete action when confirmed.
 *
 * @example
 * const [isOpen, setIsOpen] = useState(false);
 *
 * const toggleDialog = () => setIsOpen(!isOpen);
 * const confirmDelete = () => {
 *   console.log('Item deleted!');
 *   toggleDialog();
 * };
 *
 * return (
 *   <>
 *     <Button onClick={toggleDialog}>Delete Item</Button>
 *     <DeleteDialog open={isOpen} handleOpen={toggleDialog} handleDelete={confirmDelete} />
 *   </>
 * );
 *
 * @returns {JSX.Element} A modal dialog for confirming deletion.
 */
export default function DeleteDialog({ open, handleOpen, handleDelete }: IDeleteDialogProps) {
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
}
