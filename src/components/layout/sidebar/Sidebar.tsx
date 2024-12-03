import { Card, Typography } from '@material-tailwind/react';

// Sample data for related articles
const relatedArticles = [
  {
    title: 'Wet vs. Dry Cat Food: Which is Better?',
    text: [
      "A cat's whiskers — or vibrissae — are a finely-honed",
      'sensory tool that helps a cat see in the dark and',
      'not bump into objects. Whiskers are highly sensitive.',
    ],
  },
  {
    title: 'How Much Wet Food Should I Feed My Cat?',
    text: [
      "If you're unsure how to feed",
      "your cat, Purina's expert nutritionists can help. Plus,",
      "there's safety in numbers.",
    ],
  },
  {
    title: 'Do Cats Drink Water? Cat Hydration & Dehydration Prevention',
    text: [
      'Like humans and other animals, cats need water to survive.',
      "Many cats don't drink as much as they should, though.",
      'Find out how to encourage your cat to drink more.',
    ],
  },
  {
    title: 'What is the Difference Between Natural and Organic Cat Food?',
    text: [
      "If you're new to organic,",
      'you might be considering feeding your cat a natural',
      'or organic cat food.',
    ],
  },
];

export function Sidebar() {
  return (
    <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Related articles
        </Typography>
      </div>
      {relatedArticles.map((article, index) => (
        <div key={index} className="mb-4">
          <Typography variant="h6" color="blue-gray">
            {article.title}
          </Typography>
          {article.text.map((line, lineIndex) => (
            <Typography key={lineIndex} variant="body2" color="blue-gray">
              {line}
            </Typography>
          ))}
        </div>
      ))}
    </Card>
  );
}
