import React from "react";
import { Meta, Story } from "@storybook/react";
import Category from "../Categories/Category";
import { ThemeProvider } from "@emotion/react";
import TicketTheme from "../TicketTheme";
import { ToastContainer } from "react-toastify";
import { I18nextProvider } from "react-i18next";
import { TicketProps } from "../Categories/Category";

export default {
  title: "Components/Category",
  component: Category,
} as Meta;

const Template: Story<TicketProps> = (args) => (
  <ThemeProvider theme={TicketTheme}>
    <ToastContainer position="top-center" autoClose={3000} />
    <Category {...args} />;
  </ThemeProvider>
);

export const CreateNewCategory = Template.bind({});
CreateNewCategory.args = {
  isModalOpen: true,
  handleCloseModal: () => {},
  category: {
    name: "",
    description: "",
    id: 0,
  },
  setCategories: () => {},
  setCategory: () => {},
};

export const EditCategory = Template.bind({});
EditCategory.args = {
  isModalOpen: true,
  handleCloseModal: () => {},
  category: {
    id: 1,
    name: "Category Name",
    description: "Category Description",
  },
  setCategories: () => {},
  setCategory: () => {},
};
