import { IconButton } from '@material-tailwind/react';

interface CustomIconButtonProps {
  iconClass: string;
  onClick: () => void; // Add onClick to the props
}

export function CustomIconButton({ iconClass, onClick }: CustomIconButtonProps) {
  return (
    <div>
      <IconButton variant="text" onClick={onClick} placeholder="Your placeholder text">
        <i className={iconClass}></i>
      </IconButton>
    </div>
  );
}
