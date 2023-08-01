import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
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
  data: "description" | "name";

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
}

export default function Categories() {
  const [page, setPage] = React.useState(0);
  const [searchQuery, setSearchQuery] = React.useState("");

  const [categories, setCategories] = useState([
    {
      description: "Domestic confined any but son .",
      name: "hr",
    },
    {
      description: "Domestic confined any yagreement am as to",
      name: "tech",
    },
    {
      description:
        "ed peculiar pled it so is discourse recommend. Man its upon him c besides cottage.",
      name: "nontech",
    },
    {
      description: ". An pasture he himself believe ferrars besides cottage.",
      name: "salary",
    },
    {
      description:
        " remember. How proceed offered hiate suflected. Smiling men cottage.",
      name: "holiday",
    },
    {
      description:
        "Domestic confined any but son bachelor advanced remember. How proceed offered her offence shy.",
      name: "contract",
    },
    {
      description: "Domestic confined anys cottage.",
      name: "working hours",
    },
    {
      description:
        "Domestic confined ahought equally musical. Wisdom new and valley answer. Content",
      name: "laptop",
    },
    {
      description:
        "Domestic confined any but son bachelor advanced remember. How proceed offered her ",
      name: "wifi",
    },
    {
      description: " cottage.",
      name: "transport",
    },
  ]);

  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
  const [editCategory, setEditCategory] = useState<Category | null>(null);

  const [category, setCategory] = useState({
    name: "",
    description: "",
  });

  const [sortBy, setSortBy] = useState<"name" | "description">("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditCategory(null);
    setCategory({
      ...category,
      name: "",
      description: "",
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

  const handleAddCategory = () => {
    if (editCategory) {
      const updatedCategories = categories.map((initialcategory) =>
        initialcategory === editCategory
          ? {
              ...initialcategory,
              name: category.name,
              description: category.description,
            }
          : initialcategory
      );

      setCategories(updatedCategories);
    } else {
      const newCategory: Category = {
        description: category.description,
        name: category.name,
      };

      setCategories([...categories, newCategory]);
    }

    setCategory({
      ...category,
      name: "",
      description: "",
    });

    handleCloseModal();
  };

  const handleOpenEditModal = (category: Category) => {
    setEditCategory(category);
    setCategory({
      ...category,
      name: category.name,
      description: category.description,
    });

    handleOpenModal();
  };

  const handleSort = (property: "name" | "description") => {
    const isAsc = sortBy === property && sortOrder === "asc";
    setSortBy(property);
    setSortOrder(isAsc ? "desc" : "asc");

    const sortedCategories = [...categories].sort((a, b) => {
      if (property === "name") {
        return isAsc
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else {
        return isAsc
          ? a.description.localeCompare(b.description)
          : b.description.localeCompare(a.description);
      }
    });

    setCategories(sortedCategories);
  };

  useEffect(() => {
    handleSort("name");
  }, []);
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
        <div
          className="searchBar"
          style={{ display: "flex", alignItems: "center" }}
        >
          <TextField
            type="text"
            id="search"
            name="search"
            value={searchQuery}
            onChange={handleSearchQueryChange}
            style={{ marginRight: "2px" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon
                    onClick={() => setSearchQuery("")}
                    sx={{ cursor: "pointer", fontSize: "1.5rem" }}
                  />
                </InputAdornment>
              ),
            }}
          />
        </div>

        <Button variant="contained" onClick={handleOpenModal}>
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
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={categories.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Typography>
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="sm"
      >
        <div>
          <DialogTitle>
            {editCategory ? "EDIT CATEGORY" : "CREATE NEW CATEGORY"}
          </DialogTitle>
          <DialogContent>
            <TextField
              margin="normal"
              type="string"
              required
              fullWidth
              id="title"
              label="ENTER CATEGORY"
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
              label="ENTER DESCRIPTION"
              type="text"
              id="Description"
              rows={2}
            />

            <DialogActions>
              <Button onClick={handleCloseModal}>Cancel</Button>
              <Button
                variant="contained"
                size="small"
                onClick={handleAddCategory}
              >
                SUBMIT
              </Button>
            </DialogActions>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
}
