import React from "react";
import UserForm from "./UserForm";

export default {
    title: "Components/UserForm",
    component: UserForm,
};

const Template = () => <UserForm open={true} onClose={() => { }} />;

export const Default = Template.bind({});
