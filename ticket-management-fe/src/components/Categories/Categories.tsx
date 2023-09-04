import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TextField from "@mui/material/TextField";
import { useQuery } from "react-query";
import { useGetAllCategories } from "../../api/baseapi";
import SearchIcon from "@mui/icons-material/Search";
import { getAllCategories } from "../../api/baseapi";

import TableCell from "@mui/material/TableCell";
import CategoryComponent from "./Category";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Button, Typography, InputAdornment } from "@mui/material";
import { useState, useEffect } from "react";
import { Category } from "@mui/icons-material";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Usercontext } from "../../App";
import { Navigate } from "react-router-dom";
import { Toast } from "react-toastify/dist/components";
import { toast } from "react-toastify";

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
export interface Category {
  description: string;
  name: string;
  id: number;
}

export default function Categories() {
  const [page, setPage] = useState(0);

  const [searchQuery, setSearchQuery] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const { user } = React.useContext(Usercontext);
  let User = user?.user;
  const {
    data: CategoriesData,
    isLoading,
    isError,
    error,
  } = useQuery("allCategories", getAllCategories);

  // if (CategoriesData) {
  //   setCategories(CategoriesData);
  // }

  useEffect(() => {
    if (CategoriesData) {
      setCategories(CategoriesData);
      const sortedCategories: Category[] = CategoriesData.sort(
        (a: Category, b: Category) => a.id - b.id
      );

      setCategories(sortedCategories);
    } else {
      setCategories([]);
    }
  }, [CategoriesData]);

  // useEffect(() => {
  //   getAllCategories().then((res: Category[]) => {
  //     if (res && res.length > 0) {
  //       const sortedCategories: Category[] = res.sort(
  //         (a: Category, b: Category) => a.id - b.id
  //       );

  //       setCategories(sortedCategories);
  //     } else {
  //       setCategories([]);
  //     }
  //   });
  // }, []);

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

  const [category, setCategory] = useState<Category>({
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
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setPage(0);
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
      {" "}
      {User?.role !== "admin" && <Navigate to={"/dashboard"} replace />}
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
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length} align="left">
                    No categories to display.
                  </TableCell>
                </TableRow>
              ) : (
                categories
                  .filter(
                    (category) =>
                      category.name.toLowerCase().includes(searchQuery) ||
                      category.description.toLowerCase().includes(searchQuery)
                  )
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
                  })
              )}
            </TableBody>
          </Table>

          <TablePagination
            rowsPerPageOptions={[5]}
            component="div"
            count={
              categories.filter(
                (category) =>
                  category.name.toLowerCase().includes(searchQuery) ||
                  category.description.toLowerCase().includes(searchQuery)
              ).length
            }
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </Typography>
      <CategoryComponent
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        category={category}
        setCategory={setCategory}
        setCategories={setCategories}
      />
    </>
  );
}
