import { Button } from '@material-tailwind/react';

interface ButtonDefaultProps {
  color: string;
  text: string;
}

export function ButtonDefault({ color, text }: ButtonDefaultProps) {
  return (
    <Button
      placeholder=""
      color={color as 'blue' | 'red' | 'gray' | 'green' | 'amber' | 'purple' | undefined}
    >
      {text}
    </Button>
  );
}
