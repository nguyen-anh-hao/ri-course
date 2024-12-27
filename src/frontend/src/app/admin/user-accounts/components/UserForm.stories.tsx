import React from "react";
import UserForm from "./UserForm";
import { User } from "@/interfaces/user.interfaces";

interface UserFormStoryArgs {
    open: boolean;
    onClose: () => void;
    user: User;
}

const user: User = {
    id: 1,
    username: "admin",
    fullname: "Admin",
    email: "admin@gmail.com",
    roles: ["Admin"],
    dob: "1990-01-01",
    createAt: "2021-10-01",
    updatedAt: "2021-10-01",
    lastSignIn: "2021-10-01",
};

const UserFormStory = {
    title: "Components/UserForm",
    component: UserForm,
    args: {
        open: true,
        onClose: () => { },
        user: user,
    },
};

const Template = (args: UserFormStoryArgs) => <UserForm {...args} />;

export const Default = Template.bind({});

export default UserFormStory;