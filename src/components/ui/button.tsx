import { Button } from '@material-tailwind/react';

interface ButtonDefaultProps {
  color?: string;
  text: string;
  variant?: string;
  image?: string; // New prop for image source
  type?: 'button' | 'submit' | 'reset'; // Restrict type to specific string literals
  onClick?: () => void;
}

// Modify the ButtonDefault component to render images
export function ButtonDefault({ color, text, variant, image, type, onClick }: ButtonDefaultProps) {
  return (
    <Button
      placeholder=""
      variant={variant as 'filled' | 'outlined' | 'text'}
      color={color as 'blue' | 'red' | 'gray' | 'green' | 'amber' | 'purple'}
      type={type}
      onClick={onClick}
    >
      {image && <img src={image} alt="icon" />} {/* Render image if provided */}
      {text}
    </Button>
  );
}
