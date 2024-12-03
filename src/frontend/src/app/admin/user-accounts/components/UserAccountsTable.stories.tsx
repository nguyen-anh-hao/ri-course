import React from 'react';
import { Meta } from '@storybook/react';
import UserAccountsTable from './UserAccountsTable';

export default {
    title: 'Components/UserAccountsTable',
    component: UserAccountsTable,
} as Meta;

const Template: any = (args: any) => <UserAccountsTable {...args} />;

export const Default: any = Template.bind({});
Default.args = {
    users: [
        {
            id: 2,
            createAt: "2024-11-29T10:34:19.807Z",
            updatedAt: "2024-11-29T10:34:19.807Z",
            username: "user2",
            email: "user2@ricourse.com",
            roles: [
                "Learner"
            ],
            fullname: "Nguyen Anh Hao",
            dob: "2005-09-20T00:00:00.000Z",
            lastSignIn: "2024-11-29T10:34:19.807Z"
        },
        {
            id: 3,
            createAt: "2024-11-29T10:34:20.269Z",
            updatedAt: "2024-11-29T10:34:20.269Z",
            username: "user3",
            email: "user3@ricourse.com",
            roles: [
                "Learner"
            ],
            fullname: "Nguyen Anh Hao",
            dob: "2006-09-20T00:00:00.000Z",
            lastSignIn: "2024-11-29T10:34:20.269Z"
        },
        {
            id: 4,
            createAt: "2024-11-29T10:34:20.592Z",
            updatedAt: "2024-11-29T10:34:20.592Z",
            username: "user4",
            email: "user4@ricourse.com",
            roles: [
                "Learner"
            ],
            fullname: "Nguyen Anh Hao",
            dob: "2007-09-20T00:00:00.000Z",
            lastSignIn: "2024-11-29T10:34:20.592Z"
        },
        {
            id: 1,
            createAt: "2024-11-29T10:34:18.663Z",
            updatedAt: "2024-11-29T16:55:37.858Z",
            username: "user1",
            email: "user1@ricourse.com",
            roles: [
                "Learner"
            ],
            fullname: "Nguyen Anh Hao",
            dob: "2004-09-20T00:00:00.000Z",
            lastSignIn: "2024-11-29T16:55:36.046Z"
        },
        {
            id: 5,
            createAt: "2024-11-29T10:34:20.796Z",
            updatedAt: "2024-11-29T18:29:22.044Z",
            username: "user5",
            email: "user5@ricourse.com",
            roles: [
                "Admin"
            ],
            fullname: "Nguyen Anh Hao",
            dob: "2008-09-20T00:00:00.000Z",
            lastSignIn: "2024-11-29T18:29:19.934Z"
        }
    ]
};

// export const WithData = Template.bind({});
// WithData.args = {
//     // Add props with data here
// };

// export const Empty = Template.bind({});
// Empty.args = {
//     // Add props for empty state here
// };