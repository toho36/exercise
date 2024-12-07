import { Button } from '@material-tailwind/react';
import { color } from '@material-tailwind/react/types/components/alert';

interface IButtonDefaultProps {
  color?: color;
  text: string;
  variant?: 'filled' | 'outlined' | 'text';
  image?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

export function ButtonDefault({
  color = 'blue',
  text,
  variant = 'filled',
  image,
  type = 'button',
  onClick,
  disabled = false,
}: IButtonDefaultProps) {
  return (
    <Button
      variant={variant}
      color={color}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2"
    >
      {image && <img src={image} alt="icon" className="w-5 h-5" />}
      {text}
    </Button>
  );
}
