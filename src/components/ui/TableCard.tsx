// components/ui/TableCard.tsx
import React from 'react';
import { Card } from '@material-tailwind/react';

interface TableCardProps {
  children: React.ReactNode;
}

const TableCard: React.FC<TableCardProps> = ({ children }) => (
  <Card>
    <div>{children}</div>
  </Card>
);

export default TableCard;
