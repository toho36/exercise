import { Button } from '@material-tailwind/react';

interface ButtonDefaultProps {
  color?: string;
  text: string;
  variant?: string;
  image?: string; // New prop for image source
}

// Modify the ButtonDefault component to render images
export function ButtonDefault({ color, text, variant, image }: ButtonDefaultProps) {
  return (
    <Button
      placeholder=""
      variant={variant as 'filled' | 'outlined' | 'text'}
      color={color as 'blue' | 'red' | 'gray' | 'green' | 'amber' | 'purple'}
    >
      {image && <img src={image} alt="icon" />} {/* Render image if provided */}
      {text}
    </Button>
  );
}
