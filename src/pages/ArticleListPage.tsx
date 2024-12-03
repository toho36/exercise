import { Card, CardHeader, CardBody, Typography, Button } from '@material-tailwind/react';

// Dummy data for articles
const articles = [
  {
    id: 1,
    title: 'Lyft launching cross-platform service this week',
    description: 'Like so many organizations these days, Autodesk is a company in transition.',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    category: 'startups',
    author: 'John Doe', // Added author
    date: '2023-10-01', // Added date
    comments: 5, // Added number of comments
  },
  {
    id: 2,
    title: 'Lyft launching cross-platform service this week',
    description: 'Like so many organizations these days, Autodesk is a company in transition.',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    category: 'startups',
    author: 'John Doe', // Added author
    date: '2023-10-01', // Added date
    comments: 3, // Added number of comments
  },
  {
    id: 3,
    title: 'Lyft launching cross-platform service this week',
    description: 'Like so many organizations these days, Autodesk is a company in transition.',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80',
    category: 'startups',
    author: 'John Doe', // Added author
    date: '2023-10-01', // Added date
    comments: 2, // Added number of comments
  },
  // Add more articles as needed
];

export function ArticleListPage() {
  return (
    <div>
      {' '}
      {/* Added margin from top and left */}
      <h1 className="text-2xl font-bold my-8">Recent Articles</h1>{' '}
      {/* Heading for recent articles */}
      <div className="flex flex-wrap gap-8">
        {' '}
        {/* Container for cards */}
        {articles.map(article => (
          <Card key={article.id} className="w-full max-w-[48rem] flex-row">
            <CardHeader
              shadow={false}
              floated={false}
              className="m-0 w-2/5 shrink-0 rounded-r-none"
            >
              <img src={article.image} alt="card-image" className="h-full w-full object-cover" />
            </CardHeader>
            <CardBody>
              <Typography variant="h6" color="gray" className="mb-4 uppercase">
                {article.category}
              </Typography>
              <Typography variant="h4" color="blue-gray" className="mb-2">
                {article.title}
              </Typography>
              <Typography color="gray" className="mb-2 font-normal">
                By {article.author} on {article.date} {/* Author and date */}
              </Typography>
              <Typography color="gray" className="mb-8 font-normal">
                {article.description}
              </Typography>
              <div className="flex justify-between items-center">
                {' '}
                {/* Flex container for button and comments */}
                <a href="/article" className="inline-block">
                  <Button variant="text" className="flex items-center gap-2">
                    Learn More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Button>
                </a>
                <Typography color="gray" className="ml-4">
                  {' '}
                  {/* Number of comments */}
                  {article.comments} comments
                </Typography>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
}
