import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import {memo} from "react"
import {
  editCategory,
  getAllCategories,
  createCategory,
} from "../../api/baseapi";
export interface TicketProps {
  isModalOpen: boolean;
  handleCloseModal: any;
  category: any;
  setCategories: any;
  setCategory: any;
}
interface Category {
  description: string;
  name: string;
  id: number;
}

const CategoryModal=  React.memo(({
  isModalOpen,
  handleCloseModal,
  category,
  setCategory,
  setCategories,
}: TicketProps)=> {
  
  const handleSubmit = async () => {
    if (!category.name || !category.description) {
      toast.error("Fields cannot be empty");

      return;
    }
    console.log("submit")
    const categoryData = {
      name: category.name,
      description: category.description,
    };
    if (category.id) {
      try {
        let editResponse = await editCategory(category.id, categoryData);

        if (editResponse === 200) {
          toast("Category Updated successfully.");
          handleCloseModal();
          getAllCategories().then((res) => {
            const sortedCategories = res.sort(
              (a: Category, b: Category) => a.id - b.id
            );

            setCategories(sortedCategories);
          });

          return;
        }
        if (editResponse === 401) {
          toast("Unauthorized");
        }
        if (editResponse === 422) {
          toast("Category Name too long");
        }
        if (editResponse === 404) {
          toast("Validation error: invalid data format.");
        } else {
          toast("An error occurred while creating the categoy .");
        }
      } catch (error) {
        toast("An error occured while creating category");
      }
    } else {
      if (!category.name || !category.description) {
        toast.error("Please fill all the required fields");

        return;
      }

      try {
        let createCategoryResponse = await createCategory(categoryData);

        if (createCategoryResponse === 201) {
          toast("Category created successfully.");
          handleCloseModal();
          getAllCategories().then((res) => {
            const sortedCategories = res.sort(
              (a: Category, b: Category) => a.id - b.id
            );

            setCategories(sortedCategories);
          });
          return;
        }
        if (createCategoryResponse === 401) {
          toast("Unauthorized");
        }
        if (createCategoryResponse === 422) {
          toast("Category Name too long");
        }
        if (createCategoryResponse === 400) {
          toast(
            "Integrity Error: duplicate key value violates unique constraint"
          );
        }
        if (createCategoryResponse === 404) {
          toast("Validation error: invalid data format.");
        } else {
          toast("An error occurred while creating the categoy .");
        }
      } catch (error) {}
    }

    setCategory({
      name: "",
      description: "",
      id: 0,
    });

    handleCloseModal();
  };
console.log("create category modal")
  return (
    <Dialog
      open={isModalOpen}
      onClose={handleCloseModal}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {category.id ? "EDIT CATEGORY" : "CREATE NEW CATEGORY"}
      </DialogTitle>
      <DialogContent>
        <TextField
          margin="normal"
          type="string"
          required
          fullWidth
          id="title"
          label="Enter Category"
          name="title"
          value={category.name}
          onChange={(e) =>
            setCategory({
              ...category,
              name: e.target.value,
            })
          }
          autoFocus
        />
        <TextField
          value={category.description}
          onChange={(e) =>
            setCategory({
              ...category,
              description: e.target.value,
            })
          }
          margin="normal"
          required
          fullWidth
          name="Description"
          multiline
          label="Enter Description"
          type="text"
          id="Description"
          rows={2}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancel</Button>
        <Button
          variant="contained"
          size="small"
          onClick={handleSubmit}
          sx={{ marginRight: "15px" }}
        >
          SUBMIT
        </Button>
      </DialogActions>
    </Dialog>
  );
}
)

export default CategoryModal;
