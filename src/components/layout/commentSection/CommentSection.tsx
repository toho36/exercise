// CommentSection.jsx
import { CustomIconButton } from '@/components/ui/customIconButton';
import { Avatar, IconButton } from '@material-tailwind/react';
import React, { useState } from 'react';
import { AvatarDefault } from '../avatar/Avatar';
import { InputDefault } from '@/components/ui/input';

// Dummy data for comments
const dummyComments = [
  {
    id: 1,
    author: 'John Doe',
    timestamp: '2 hours ago',
    text: 'This is a comment.',
    score: 5,
  },
  {
    id: 2,
    author: 'Jane Smith',
    timestamp: '1 hour ago',
    text: 'Another comment here.',
    score: 3,
  },
];

export function CommentSection() {
  const [comments, setComments] = useState(dummyComments);

  const handleVote = (id: number, delta: number) => {
    setComments(
      comments.map(comment =>
        comment.id === id ? { ...comment, score: comment.score + delta } : comment,
      ),
    );
  };

  return (
    <div className="">
      <div className="py-3">
        <h1>Comments ({comments.length})</h1>
      </div>
      <div className="flex items-center mb-2.5">
        <AvatarDefault />

        <InputDefault placeholder="join the discussion" type="text" />
      </div>
      {comments.map(comment => (
        <div key={comment.id} className="flex items-start mt-2.5">
          <AvatarDefault /> {/* Added margin-right for padding */}
          <div className="ml-4">
            <strong>{comment.author}</strong> <span>{comment.timestamp}</span>
            <p>{comment.text}</p>
            <div className="flex items-center">
              <span> {comment.score}</span>
              <div className="w-px h-5 bg-gray-300 ml-3" />
              <CustomIconButton
                iconClass="fa-solid fa-chevron-up"
                onClick={() => handleVote(comment.id, 1)}
              />
              <div className="w-px h-5 bg-gray-300" />
              <CustomIconButton
                iconClass="fa-solid fa-chevron-down"
                onClick={() => handleVote(comment.id, -1)}
              />
              <div className="w-px h-5 bg-gray-300" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
