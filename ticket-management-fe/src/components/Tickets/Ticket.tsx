import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link/Link";
import { useState } from "react";
import { getAllAssignees, getTicket } from "../../api/baseapi";
import { getAllCategories } from "../../api/baseapi";
import { baseUrl } from "../../api/baseapi";
import { useMutation } from "@tanstack/react-query";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { createTicket, updateTicket } from "../../api/baseapi";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { deleteTicket } from "../../api/baseapi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TicketList } from "./TicketBoard";
import { useEffect } from "react";
import { getAllTickets } from "../../api/baseapi";
import { any } from "prop-types";

interface TicketProps {
  id: number;
  selectedTicket: any;

  setShowTicket: React.Dispatch<React.SetStateAction<boolean>>;

  setNewTicketId: any;
}
export interface User {
  id: number;
  name: string;
}
interface Attachment {
  id: number;
  filename: string;
  filepath: string[];
}
interface TicketProps {
  id: number;
  selectedTicket: any;
  setLocaltickets: React.Dispatch<React.SetStateAction<TicketList[]>>;
}
interface TicketProps {
  id: number;
  selectedTicket: any;
  setLocaltickets: React.Dispatch<React.SetStateAction<TicketList[]>>;
}

const Ticket = React.memo(
  ({
    id,
    selectedTicket,
    setShowTicket,
    setNewTicketId,
    setLocaltickets,
  }: TicketProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
      getAllCategories().then((res: Category[]) => {
        if (res && res.length > 0) {
          setCategories(res);
        } else {
          setCategories([]);
        }
      });
      getAllAssignees().then((res: User[]) => {
        if (res && res.length > 0) {
          setAssignee(res);
        } else {
          setCategories([]);
        }
      });
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setticketInformation({
        title: "",
        description: "",
        category_id: 0,
        priority: "",
        assignee: 0,

        file: [],
        filepath: [],
        created_by: 0,
      });
      setShowTicket(false);
      setIsModalOpen(false);
      setNewTicketId(null);
    };
    interface Category {
      description: string;
      name: string;
      id: number;
    }
    interface Assignee {
      name: string;
      id: number;
    }
    const [categories, setCategories] = useState<Category[]>([]);
    const [assignees, setAssignee] = useState<Assignee[]>([]);
    const [ticketInformation, setticketInformation] = useState<{
      title: string;
      description: string;
      category_id: number | string;
      priority: string;
      assignee: number | string;
      created_by: number;
      filepath: string[];

      file: File[];
    }>({
      title: "",
      description: "",
      category_id: "Select Category*",
      priority: "Select Priority*",
      assignee: "Select Assignee*",
      filepath: [],
      created_by: 1,
      file: [],
    });

    const [ticketUrl, setticketUrl] = useState<{
      fileurl: string[];
    }>({
      fileurl: [],
    });

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files) {
        const urls = Array.from(files).map((file) => URL.createObjectURL(file));
        const fileArray: File[] = Array.from(files);
        setticketInformation({
          ...ticketInformation,
          file: [...ticketInformation.file, ...fileArray],
        });

        setticketUrl({
          ...ticketUrl,
          fileurl: [...ticketUrl.fileurl, ...urls],
        });
      }
    };

    const handleEdit = () => {
      if (selectedTicket) {
        setticketInformation({
          title: selectedTicket.title,
          description: selectedTicket.description,
          category_id: selectedTicket.category.id,

          filepath: selectedTicket.attachments.map(
            (attachment: Attachment) => attachment.filepath
          ),

          priority: selectedTicket.priority,

          created_by: selectedTicket.created_by,
          assignee: selectedTicket.assigned_to.id,
          file: [],
        });

        handleOpenModal();
      }
    };

    useEffect(() => {
      if (id === null || id === 0) {
        handleOpenModal();
      } else {
        handleEdit();
      }
    }, [id]);
    const handleDeleteAttachment = (indexToDelete: number) => {
      setticketInformation((prevData) => ({
        ...prevData,
        file: prevData.file.filter(
          (url, index, value) => index !== indexToDelete
        ),
      }));
      setticketUrl((prevUrls) => ({
        ...prevUrls,
        fileurl: prevUrls.fileurl.filter(
          (url, index, value) => index !== indexToDelete
        ),
      }));
    };

    const createTicketmutation = useMutation({
      mutationFn: createTicket,
      onSuccess(data, variables, context) {
        console.log(data, variables);
        toast(data, {
          theme: "light",
          autoClose: 1500,
          position: "top-right",
        });
        getAllTickets().then((res) => {
          setLocaltickets(res);
        });
        handleCloseModal();
      },
      onError(error: any) {
        console.log(error)
        toast(error, {
          theme: "light",
          autoClose: 1500,
          position: "top-right",
        });
      },
    });
    const deleteTicketMutation = useMutation({
      mutationFn: deleteTicket,
      onSuccess(data: any) {
        toast(data, {
          theme: "light",
          autoClose: 1500,
          position: "top-right",
        });
        getAllTickets().then((res) => {
          setLocaltickets(res);
        });
        handleCloseModal();
      },
      onError(error: any) {
        toast(error, {
          theme: "light",
          autoClose: 1500,
          position: "top-right",
        });
      },
    });
    const updateTicketMutation = useMutation({
      
      mutationFn : updateTicket,
      onSuccess(data: any) {
        toast(data, {
          theme: "light",
          autoClose: 1500,
          position: "top-right",
        });
        getAllTickets().then((res) => {
          setLocaltickets(res);
        });
        handleCloseModal();
      },
      onError(error: any) {
        toast(error, {
          theme: "light",
          autoClose: 1500,
          position: "top-right",
        });
      },
    });
    const handleSubmit = async () => {
      if (
        !ticketInformation.title ||
        !ticketInformation.description ||
        ticketInformation.category_id === "Select Category*" ||
        ticketInformation.priority === "Select Priority*" ||
        ticketInformation.assignee === "Select Assignee*"
      ) {
        toast.error("Please fill all the required fields", {
          theme: "light",
          autoClose: 1500,
          position: "top-right",
        });

        return;
      }

      const formData = new FormData();

      formData.append("title", ticketInformation.title);
      formData.append("description", ticketInformation.description);
      formData.append("category_id", ticketInformation.category_id.toString());
      formData.append("priority", ticketInformation.priority);
      formData.append("assignee", ticketInformation.assignee.toString());
      formData.append("created_by", ticketInformation.created_by?.toString());

      ticketInformation.file.forEach((file) => {
        formData.append("files", file);
      });

      if (id === 0) {
        try {
          // let createResponse = await createTicket(formData);
          await createTicketmutation.mutate(formData);

          // if (createTicketmutation.data==401) {
          //   toast("Unauthorized", {
          //     theme: "light",
          //     autoClose: 1500,
          //     position: "top-right",
          //   });
          // }
          // if (createTicketmutation.data==404) {
          //   toast("Validation error: invalid data format.", {
          //     theme: "light",
          //     autoClose: 1500,
          //     position: "top-right",
          //   });
          // } else {
          //   toast(
          //     "An error occurred while submitting the form. Please try again ",
          //     {
          //       theme: "light",
          //       autoClose: 1500,
          //       position: "top-right",
          //     }
          //   );
          // }
        } catch (error) {}
      } else {
        let editResponse = await updateTicket(id, formData);
        //  updateTicketMutation.mutate(id,formData)
        if (editResponse === 200) {
          toast("Ticket Updated successfully.", {
            theme: "light",
            autoClose: 1500,
            position: "top-right",
          });
          getAllTickets().then((res) => {
            setLocaltickets(res);
          });
          handleCloseModal();
          return;
        }
        if (editResponse === 401) {
          toast("Unauthorized", {
            theme: "light",
            autoClose: 1500,
            position: "top-right",
          });
        }
        if (editResponse === 404) {
          toast("Validation error: invalid data format.");
        } else {
          toast("An error occurred while editing the form. Please try again");
        }
      }
    };

    const deleteTicketHandler = async (id: number) => {
      try {
        await deleteTicketMutation.mutate(id);
      } catch (error) {
        toast(
          "An error occurred while deleting the ticket. Please try again.",
          {
            theme: "light",
            autoClose: 1500,
            position: "top-right",
          }
        );
      }
    };

    return (
      <div>
        <Dialog
          open={isModalOpen}
          onClose={handleCloseModal}
          fullWidth
          maxWidth="sm"
        >
          <div>
            <DialogTitle>
              {id ? "TICKET DETAILS" : "CREATE NEW TICKET"}
            </DialogTitle>

            <DialogContent>
              <TextField
                value={ticketInformation.title}
                onChange={(e) => {
                  setticketInformation({
                    ...ticketInformation,
                    title: e.target.value,
                  });
                }}
                margin="normal"
                type="string"
                required={id === null || id === 0}
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoFocus
              />
              <TextField
                value={ticketInformation.description}
                onChange={(e) => {
                  setticketInformation({
                    ...ticketInformation,
                    description: e.target.value,
                  });
                }}
                margin="normal"
                required={id === null || id === 0}
                fullWidth
                name="Description"
                multiline
                label="Description"
                type="text"
                id="Description"
                rows={2}
                sx={{ marginBottom: "20px" }}
              />

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                required={id === null || id === 0}
                defaultValue={ticketInformation.category_id}
                autoFocus
                name="category_id"
                type="text"
                value={ticketInformation.category_id}
                sx={{ marginBottom: "20px" }}
                onChange={(e) => {
                  setticketInformation({
                    ...ticketInformation,
                    category_id: e.target.value,
                  });
                }}
              >
                <MenuItem value={"Select Category*"} disabled>
                  Select Category*
                </MenuItem>

                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                required={id === null || id === 0}
                defaultValue={ticketInformation.assignee}
                autoFocus
                name="assignee"
                type="text"
                value={ticketInformation.assignee}
                sx={{ marginBottom: "20px" }}
                onChange={(e) => {
                  setticketInformation({
                    ...ticketInformation,
                    assignee: e.target.value,
                  });
                }}
              >
                <MenuItem value={"Select Assignee*"} disabled>
                  Select Assignee*
                </MenuItem>

                {assignees.map((assigned_to) => (
                  <MenuItem key={assigned_to.id} value={assigned_to.id}>
                    {assigned_to.name}
                  </MenuItem>
                ))}
              </Select>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                fullWidth
                required={id === null || id === 0}
                defaultValue="Select Priority*"
                autoFocus
                name="priority"
                type="text"
                value={ticketInformation.priority}
                sx={{ marginBottom: "20px" }}
                onChange={(e) => {
                  setticketInformation({
                    ...ticketInformation,
                    priority: e.target.value,
                  });
                }}
              >
                <MenuItem value={"Select Priority*"} disabled>
                  Select Priority*
                </MenuItem>
                <MenuItem value={"low"}>low</MenuItem>
                <MenuItem value={"medium"}>medium</MenuItem>
                <MenuItem value={"high"}>high</MenuItem>
              </Select>
              <Stack
                direction="row"
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
                spacing={2}
                marginBottom={"20px"}
              >
                <label htmlFor="upload-image">
                  <Button variant="contained" component="span" size="small">
                    Upload
                  </Button>
                  <input
                    id="upload-image"
                    hidden
                    accept="image/* , application/pdf"
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                  />
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "16px",
                  }}
                >
                  {ticketUrl.fileurl.map((url, index) => (
                    <React.Fragment key={index}>
                      {url.startsWith("data:image") ? (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <img
                            src={url}
                            alt={`Uploaded ${index}`}
                            height="60"
                          />{" "}
                          <IconButton
                            onClick={() => handleDeleteAttachment(index)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      ) : (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <Link
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              border: "1px solid #ccc",
                              padding: "3px 6px",
                              borderRadius: "5px",
                              backgroundColor: "#f0f0f0",
                              margin: "4px",
                              textDecoration: "none",
                              color: "#000",
                              fontSize: "14px",
                            }}
                          >
                            View Attachment {index + 1}
                          </Link>
                          <IconButton
                            onClick={() => handleDeleteAttachment(index)}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      )}
                    </React.Fragment>
                  ))}

                  {ticketInformation.filepath.map((path, index) => (
                    <div
                      key={index}
                      style={{
                        marginTop: "5px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Link
                        href={baseUrl.replace("/v1", "") + path}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          border: "1px solid #ccc",
                          padding: "3px 6px",
                          borderRadius: "5px",
                          backgroundColor: "#f0f0f0",
                          textDecoration: "none",
                          color: "#000",
                          fontSize: "14px",
                        }}
                      >
                        View Attachment {index + 1}
                      </Link>
                    </div>
                  ))}
                </div>
              </Stack>
              <DialogActions
                sx={{
                  justifyContent: id ? "space-between" : "flex-end",
                  alignItems: "center",
                  padding: "0px",
                }}
              >
                {id ? (
                  <Button
                    color="error"
                    variant="contained"
                    onClick={() => {
                      deleteTicketHandler(id);
                    }}
                    size="small"
                  >
                    DELETE TICKET
                  </Button>
                ) : null}

                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <Button onClick={handleCloseModal} size="small">
                    Cancel
                  </Button>
                  <div style={{ flexGrow: 1 }}></div>{" "}
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    size="small"
                  >
                    {id ? "EDIT TICKET" : "CREATE NEW TICKET"}
                  </Button>
                </div>
              </DialogActions>
            </DialogContent>
          </div>
        </Dialog>
      </div>
    );
  }
);

export default Ticket;
