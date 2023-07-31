import * as React from "react";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link/Link";
import { useState } from "react";
import { toast } from "react-toastify";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Container from "@mui/material/Container";
import { useEffect } from "react";
import { Widgets } from "@mui/icons-material";
import { margin, textAlign } from "@mui/system";

function Ticket() {
  let id = "";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({
    title: "title",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    category: "HR",
    file: [] as File[],
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setticketInformation({
      title: "",
      description: "",
      category: "",
      file: [],
    });
    id = "";
    setIsModalOpen(false);
  };

  const [ticketInformation, setticketInformation] = useState<{
    title: string;
    description: string;
    category: string;
    file: File[];
  }>({
    title: "",
    description: "",
    category: "SELECT CATEGORY",
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
    //   fetch(`/v1/ticket/${id}`)
    //     .then((response) => {
    //       if (response.ok) {
    //         return response.json();
    //       } else {
    //         throw new Error("Ticket data not found");
    //       }
    //     })
    //     .then((data) => {
    // Set the ticket data to populate the text fields for editing
    setticketInformation({
      title: data.title,
      description: data.description,
      category: data.category,
      file: [],
    });

    handleOpenModal();

    // Open the modal to edit the ticket
    // })
    // .catch((error) => {
    //   console.error("Error fetching ticket data:", error);
    //   alert("Error fetching ticket data. Please try again later.");
    // });
  };
  useEffect(() => {
    if (id !== "") {
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
  //for api calls

  const handleSubmit = async () => {
    if (
      !ticketInformation.title ||
      !ticketInformation.description ||
      ticketInformation.category === "SELECT CATEGORY"
    ) {
      toast.error("Please fill all the required fields");
      return;
    }
    setticketUrl({ fileurl: [] });
    handleCloseModal();

    // try {
    //   const payload = {
    //     title: newTicketInformation.title,
    //     description: newTicketInformation.description,
    //     category: newTicketInformation.category,
    //     file: fileUrl, // Use the fileUrl state variable as the file URL
    //   };

    // API call using fetch
    //commenting api call for testing
    //   const response = await fetch("/v1/ticket/", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(payload), // Convert the payload object to JSON format
    //   });

    //   // Check the response status and handle accordingly
    //   if (response.status === 201) {
    //     alert("Ticket created successfully.");
    //     handleCloseModal(); // Close the modal after successful submission
    //   } else if (response.status === 401) {
    //     alert("Unauthorized");
    //   } else if (response.status === 404) {
    //     const data = await response.json();
    //     alert(data.msg || "Validation error: invalid data format.");
    //   } else {
    //     alert("An error occurred while submitting the form.");
    //   }
    // } catch (error) {
    //   alert("An error occurred while submitting the form.");
    //   console.error(error);
    // }
    /////////////////////////////////////
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpenModal} size="small">
        CREATE NEW TICKET
      </Button>

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
              defaultValue="SELECT CATEGORY"
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
              <MenuItem value={"SELECT CATEGORY"} disabled>
                SELECT CATEGORY
              </MenuItem>
              <MenuItem value={"TECHNICAL SUPPORT"}>TECHNICAL SUPPORT</MenuItem>
              <MenuItem value={"HR"}>HR</MenuItem>
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
