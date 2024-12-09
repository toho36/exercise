import { Link } from 'react-router-dom';
import { ButtonDefault } from '@/components/ui/button';
export function NotFoundPage() {
  return (
    <div>
      <h1 className="py-10">404 Not Found where is the link</h1>
      <Link to="/">
        <ButtonDefault text="Back to Home" />
      </Link>
    </div>
  );
}
