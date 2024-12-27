import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactMarkdown from 'react-markdown';

const MentorPage = async () => {
  const filePath = path.join(process.cwd(), 'src', 'app', 'mentor', 'demo.md');

  let content = '';
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch {
    content = 'Error reading the Markdown file'; 
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MentorPage;
