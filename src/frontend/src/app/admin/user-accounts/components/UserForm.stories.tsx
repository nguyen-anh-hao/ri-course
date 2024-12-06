import React from "react";
import UserForm from "./UserForm";
import { User } from "@/interfaces/user.interfaces";

export default {
    title: "Components/UserForm",
    component: UserForm,
};

const user: User = {
    id: 1,
    username: "admin",
    fullname: "Admin",
    email: "admin@gmail.com",
    roles: ["Admin"],
    dob: "1990-01-01",
    createAt: "2021-10-01",
    updatedAt: "2021-10-01",
    lastSignIn: "2021-10-01"
}

const Template = () => <UserForm open={true} onClose={() => { }} user={user} />;

export const Default = Template.bind({});
