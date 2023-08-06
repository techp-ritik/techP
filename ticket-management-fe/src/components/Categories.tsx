import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { createCategory, editCategory, getAllCategories } from "../api/baseapi";
import { toast } from "react-toastify";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Typography, InputAdornment } from "@mui/material";
import DialogContent from "@mui/material/DialogContent";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Category } from "@mui/icons-material";
import TableSortLabel from "@mui/material/TableSortLabel";

interface Column {
  data: "description" | "name" | "id";
  label: string;
  minWidth?: number;
  align?: "center";
  format?: (value: number) => string;
}
const columns: readonly Column[] = [
  { data: "name", label: "CATEGORY", minWidth: 150 },
  { data: "description", label: "DESCRIPTION", minWidth: 100 },
];
interface Category {
  description: string;
  name: string;
  id: number;
}

export default function Categories() {
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    getAllCategories().then((res) => {
      const sortedCategories = res.sort(
        (a: Category, b: Category) => a.id - b.id
      );

      setCategories(sortedCategories);
    });
  }, []);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [category, setCategory] = useState({
    name: "",
    description: "",
    id: 0,
  });

  const [sortBy, setSortBy] = useState<"name" | "description" | "id">("id");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCategory({
      name: "",
      description: "",
      id: 0,
    });

    setIsModalOpen(false);
  };
  const handleSearchQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCategories = categories.filter((category) => {
    const nameMatch =
      category.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1;
    const descriptionMatch =
      category.description.toLowerCase().indexOf(searchQuery.toLowerCase()) !==
      -1;
    return nameMatch || descriptionMatch;
  });

  const handleSubmit = async () => {
    if (!category.name || !category.description) {
      toast.error("Fields cannot be empty");

      return;
    }
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("description", category.description);
    if (category.id) {
      try {
        let editResponse = await editCategory(category.id, formData);

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
        if (editResponse === 404) {
          toast("Validation error: invalid data format.");
        } else {
          toast("An error occurred while creating the categoy .");
        }
      } catch (error) {}
    } else {
      if (!category.name || !category.description) {
        toast.error("Please fill all the required fields");

        return;
      }

      try {
        let createCategoryResponse = await createCategory(formData);

        if (createCategoryResponse === 200) {
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

  const handleOpenEditModal = (category: Category) => {
    setCategory({
      name: category.name,
      description: category.description,
      id: category.id,
    });

    handleOpenModal();
  };

  const handleSort = (property: "name" | "description" | "id") => {
    const isAsc = sortBy === property && sortOrder === "asc";
    setSortBy(property);
    setSortOrder(isAsc ? "desc" : "asc");

    const sortedCategories = [...categories].sort((a, b) => {
      if (property === "name") {
        return isAsc
          ? a.name.toLocaleLowerCase().localeCompare(b.name.toLocaleLowerCase())
          : b.name
              .toLocaleLowerCase()
              .localeCompare(a.name.toLocaleLowerCase());
      } else if (property === "id") {
        return isAsc ? a.id - b.id : b.id - a.id;
      } else if (property === "description") {
        return isAsc
          ? a.description
              .toLocaleLowerCase()
              .localeCompare(b.description.toLocaleLowerCase())
          : b.description
              .toLocaleLowerCase()
              .localeCompare(a.description.toLocaleLowerCase());
      } else {
        return 0;
      }
    });

    setCategories(sortedCategories);
  };

  return (
    <>
      <div
        style={{
          textAlign: "end",
          margin: "20px",
          display: "flex",
          alignItems: "center",

          justifyContent: "space-between",
        }}
      >
        <TextField
          type="text"
          id="search"
          name="search"
          value={searchQuery}
          placeholder="Search Category"
          onChange={handleSearchQueryChange}
          style={{ marginRight: "1px" }}
          sx={{ width: "300px" }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon
                  onClick={() => setSearchQuery("")}
                  sx={{ cursor: "pointer" }}
                />
              </InputAdornment>
            ),
          }}
        />
        <Button
          variant="contained"
          onClick={handleOpenModal}
          sx={{ height: "40px" }}
        >
          CREATE NEW CATEGORY
        </Button>
      </div>

      <Typography
        className="table"
        sx={{ margin: "20px", textAlign: "center" }}
      >
        <TableContainer>
          <Table stickyHeader aria-label="sticky customized table">
            <TableHead>
              <TableRow sx={{ backgroundColor: "grey" }}>
                {columns.map((column) => (
                  <TableCell
                    sx={{
                      background: "#D4D4D4",
                      color: "black",
                      fontWeight: "600",
                    }}
                    key={column.data}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    <TableSortLabel
                      active={sortBy === column.data}
                      direction={sortOrder}
                      onClick={() => handleSort(column.data)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCategories
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.description}
                      onClick={() => handleOpenEditModal(row)}
                      style={{ cursor: "pointer" }}
                    >
                      {columns.map((column) => {
                        const value = row[column.data];
                        return (
                          <TableCell key={column.data} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={categories.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Typography>

      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <div>
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
        </div>
      </Dialog>
    </>
  );
}
