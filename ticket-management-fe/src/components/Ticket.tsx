import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link/Link";
import { useState } from "react";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { getCreateTicket, getUpdateTicket } from "../api/baseapi";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import { useEffect } from "react";
interface Attachment {
  id: number;
  filename: string;
  filepath: string;
}
interface TicketProps {
  id: number;
  selectedTicket: any;
}

function Ticket({ id, selectedTicket }: TicketProps) {
  // let id: number | null = 2;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setticketInformation({
      title: "",
      description: "",
      category: "",
      priority: "",
      assignee: "",
      status: "",
      file: [],
    });
    id = 0;

    setIsModalOpen(false);
  };

  const [ticketInformation, setticketInformation] = useState<{
    title: string;
    description: string;
    category: string;
    priority: string;
    assignee: string;
    status: string;
    file: File[];
  }>({
    title: "",
    description: "",
    category: "Select Category",
    priority: "Select Priority",
    assignee: "",
    status: "",
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
    setticketInformation({
      title: selectedTicket.title,
      description: selectedTicket.description,
      category: selectedTicket.category,
      priority: selectedTicket.priority,
      status: selectedTicket.status,
      assignee: selectedTicket.assignee.toString(),
      file: [],
    });

    handleOpenModal();
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

  const handleSubmit = async () => {
    if (
      !ticketInformation.title ||
      !ticketInformation.description ||
      ticketInformation.category === "Select Category" ||
      ticketInformation.priority === "Select Priority"
    ) {
      toast.error("Please fill all the required fields");

      return;
    }

    const formData = new FormData();
    formData.append("title", ticketInformation.title);
    formData.append("description", ticketInformation.description);
    formData.append("category", ticketInformation.category);
    formData.append("priority", ticketInformation.priority);
    formData.append("assignee", ticketInformation.assignee);
    // formData.append("status" , ticketInformation.status);

    // Append the file(s) to the FormData object
    ticketInformation.file.forEach((file) => {
      formData.append("files", file);
    });

    if (id === 0) {
      try {
        let createResponse = await getCreateTicket(formData);

        if (createResponse === 201) {
          toast("Ticket created successfully.");
          handleCloseModal();
        }
        if (createResponse === 401) {
          toast("Unauthorized");
        }
        if (createResponse === 404) {
          toast("Validation error: invalid data format.");
        } else {
          toast("An error occurred while submitting the form .");
        }
      } catch (error) {}
    } else {
      let editResponse = await getUpdateTicket(formData, id);

      if (editResponse === 200) {
        toast("Ticket edited successfully.");
        handleCloseModal();
      }
      if (editResponse === 401) {
        toast("Unauthorized");
      }
      if (editResponse === 404) {
        toast("Validation error: invalid data format.");
      } else {
        toast("An error occurred while submitting the form .");
      }
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
              required
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
              required
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
              required
              defaultValue="Select Category"
              autoFocus
              name="category"
              type="text"
              value={ticketInformation.category}
              sx={{ marginBottom: "20px" }}
              onChange={(e) => {
                setticketInformation({
                  ...ticketInformation,
                  category: e.target.value,
                });
              }}
            >
              <MenuItem value={"Select Category"} disabled>
                Select Category
              </MenuItem>
              <MenuItem value={"TECHNICAL SUPPORT"}>TECHNICAL SUPPORT</MenuItem>
              <MenuItem value={"HR"}>HR</MenuItem>
            </Select>

            <TextField
              value={ticketInformation.assignee}
              onChange={(e) => {
                setticketInformation({
                  ...ticketInformation,
                  assignee: e.target.value,
                });
              }}
              margin="normal"
              required
              fullWidth
              name="Assignee"
              label="Assignee"
              type="number"
              id="Assignee"
              sx={{ marginBottom: "20px" }}
            />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              required
              defaultValue="Select Priority"
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
              <MenuItem value={"Select Priority"} disabled>
                Select Priority
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

              {ticketUrl.fileurl.map((url, index) => (
                <React.Fragment key={index}>
                  {url.startsWith("data:image") ? (
                    <div>
                      <img src={url} alt={`Uploaded ${index}`} height="100" />
                      <IconButton
                        onClick={() => handleDeleteAttachment(index)}
                        size="small"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  ) : (
                    <div>
                      <Link
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          border: "1px solid #ccc",
                          padding: "5px 10px",
                          borderRadius: "5px",
                          backgroundColor: "#f0f0f0",
                          textDecoration: "none",
                          color: "#000",
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
            </Stack>

            <DialogActions>
              <Button onClick={handleCloseModal}>Cancel</Button>

              <Button variant="contained" onClick={handleSubmit} size="small">
                {id ? "EDIT TICKET" : "CREATE NEW TICKET"}
              </Button>
            </DialogActions>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}

export default Ticket;
