// components/ui/TableCard.tsx
import React from 'react';
import { Card } from '@material-tailwind/react';

interface TableCardProps {
  children: React.ReactNode;
}

export default function TableCard({ children }: TableCardProps) {
  return (
    <Card>
      <div>{children}</div>
    </Card>
  );
}
