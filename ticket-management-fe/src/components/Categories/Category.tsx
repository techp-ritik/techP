import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import { editCategory, createCategory } from "../../api/baseapi";
import { useMutation } from "react-query";
import { queryClient } from "../..";

export interface TicketProps {
  isModalOpen: boolean;
  handleCloseModal: () => void;
  category: Category;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  setCategory: React.Dispatch<React.SetStateAction<Category>>;
}
interface Category {
  description: string;
  name: string;
  id: number;
}

const CategoryModal = React.memo(
  ({
    isModalOpen,
    handleCloseModal,
    category,
    setCategory,
    setCategories,
  }: TicketProps) => {
    const editCategoryMutation = useMutation(
      (params: { userId: number; categoryData: any }) =>
        editCategory(params.userId, params.categoryData),

      {
        onSuccess: (data, variables, context) => {
          queryClient.invalidateQueries("allCategories");
          handleCloseModal();
          toast(data);
        },
        onError: (error) => {
          toast.error("" + error);
        },
      }
    );
    const createCategoryMutation = useMutation(createCategory, {
      onSuccess: (data, variables, context) => {
        toast(data);

        queryClient.invalidateQueries("allCategories");
      },
      onError: (error) => {
        toast.error("" + error);
      },
    });

    const handleSubmit = async () => {
      if (!category.name || !category.description) {
        toast.error("Fields cannot be empty");

        return;
      }

      const categoryData = {
        name: category.name,
        description: category.description,
      };
      if (category.id) {
        try {
          let userId = category.id;
          editCategoryMutation.mutate({ userId, categoryData });
        } catch (error) {
          toast("An error occured while creating category");
        }
      } else {
        if (!category.name || !category.description) {
          toast.error("Please fill all the required fields");

          return;
        }

        try {
          createCategoryMutation.mutate(categoryData);
        } catch (error) {}
      }

      setCategory({
        name: "",
        description: "",
        id: 0,
      });

      handleCloseModal();
    };

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
);

export default CategoryModal;
