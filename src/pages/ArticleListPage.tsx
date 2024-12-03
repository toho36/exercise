import { Link } from 'react-router-dom';

export function ArticleListPage() {
  return (
    <div>
      <h1>Article</h1>
      <Link to="/">
        <button type="button">Back to Home</button>
      </Link>
    </div>
  );
}
