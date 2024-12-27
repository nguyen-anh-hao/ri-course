import React, { useState } from 'react';
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography, Button } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

const mockComments = [
    {
        id: 1,
        name: 'John Doe',
        avatar: '/path/to/avatar1.jpg',
        comment: 'This is a mock comment.',
        date: '2021-10-01T12:00:00Z',
        replies: [
            {
                id: 2,
                name: 'Jane Smith',
                avatar: '/path/to/avatar2.jpg',
                comment: 'This is a mock reply.',
                date: '2021-10-01T12:30:00Z',
            },
        ],
    },
    {
        id: 3,
        name: 'Alice Johnson',
        avatar: '/path/to/avatar3.jpg',
        comment: 'Another mock comment.',
        date: '2021-10-01T13:00:00Z',
        replies: [],
    },
];

const Comments: React.FC = () => {
    const [visibleReplies, setVisibleReplies] = useState<{ [key: number]: boolean }>({});

    const toggleReplies = (commentId: number) => {
        setVisibleReplies((prev) => ({
            ...prev,
            [commentId]: !prev[commentId],
        }));
    };

    return (
        <List>
            {mockComments.map((comment) => (
                <div key={comment.id} >
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar alt={comment.name} src={comment.avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography variant="h6" component="span">
                                    {comment.name}
                                </Typography>
                            }
                            secondary={
                                <>
                                    <Typography component="span" variant="body2" color="textPrimary">
                                        {comment.comment}
                                    </Typography>
                                    <Typography component="span" variant="body2" color="textSecondary" sx={{ display: 'block', mt: 0.5 }}>
                                        {formatDistanceToNow(new Date(comment.date)) + ' ago'}
                                    </Typography>
                                    {comment.replies.length > 0 && (
                                        <Button onClick={() => toggleReplies(comment.id)} sx={{ mt: 1, p: 0 }}>
                                            {visibleReplies[comment.id] ? 'Hide replies' : 'View replies'}
                                        </Button>
                                    )}
                                </>
                            }
                        />
                    </ListItem>
                    {visibleReplies[comment.id] && comment.replies.map((reply) => (
                        <ListItem key={reply.id} alignItems="flex-start" sx={{ pl: 10 }}>
                            <ListItemAvatar>
                                <Avatar alt={reply.name} src={reply.avatar} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Typography variant="subtitle1" component="span">
                                        {reply.name}
                                    </Typography>
                                }
                                secondary={
                                    <>
                                        <Typography component="span" variant="body2" color="textPrimary">
                                            {reply.comment}
                                        </Typography>
                                        <Typography component="span" variant="body2" color="textSecondary" sx={{ display: 'block', mt: 0.5 }}>
                                            {formatDistanceToNow(new Date(reply.date)) + ' ago'}
                                        </Typography>
                                    </>
                                }
                            />
                        </ListItem>
                    ))}
                </div>
            ))}
        </List>
    );
};

export default Comments;