import { IconButton } from '@material-tailwind/react';

interface ICustomIconButtonProps {
  iconClass: string;
  onClick: () => void; // Add onClick to the props
}

export function CustomIconButton({ iconClass, onClick }: ICustomIconButtonProps) {
  return (
    <div>
      <IconButton variant="text" onClick={onClick} placeholder="Your placeholder text">
        <i className={iconClass}></i>
      </IconButton>
    </div>
  );
}
