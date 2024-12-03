import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div>
      <h1>404 Not Found where is the link</h1>
      <Link to="/">
        <button type="button">Back to Home</button>
      </Link>
    </div>
  );
};
