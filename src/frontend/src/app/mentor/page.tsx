import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactMarkdown from 'react-markdown';

const MentorPage = () => {
  const filePath = path.join(process.cwd(), 'frontend', 'app', 'mentor', 'demo.md');
  const fileContents = fs.readFileSync(filePath, 'utf8');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <ReactMarkdown>{fileContents}</ReactMarkdown>
    </div>
  );
};

export default MentorPage;
