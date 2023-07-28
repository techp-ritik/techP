import * as React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link/Link";
import { useState } from "react";
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

function TicketCreation() {
  let id = "8";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState({
    title: "title",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    category: "HR",
    upload: [
      "https://www.africau.edu/images/default/sample.pdf ",
      " https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
    ],
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setnewTicketInformation({
      title: "",
      description: "",
      selectCategory: "",
      upload: [],
    });
    id = "";
    setIsModalOpen(false);
  };

  const [newTicketInformation, setnewTicketInformation] = useState<{
    title: string;
    description: string;
    selectCategory: string;
    upload: string[]; // Explicitly specify the type as string[]
  }>({
    title: "",
    description: "",
    selectCategory: "SELECT CATEGORY",
    upload: [], // Initialize as an empty array of strings
  });

  // const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string[]>([]);

  // const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (file) {
  //     const fileUrl = URL.createObjectURL(file);
  //     setFileUrl(fileUrl);
  //   }
  // };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const urls = Array.from(files).map((file) => URL.createObjectURL(file));

      setFileUrl([...fileUrl, ...urls]);
    }
  };
  //to update textfields if id is
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
    setnewTicketInformation({
      title: data.title,
      description: data.description,
      selectCategory: data.category,

      upload: data.upload,
    });
    setFileUrl(data.upload);

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

  //   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = event.target.files?.[0];
  //     if (file) {
  //       const reader = new FileReader();

  //       reader.onloadend = () => {
  //         setFileUrl(reader.result as string);
  //       };

  //       reader.readAsDataURL(file);
  //     }
  //   };
  const handleDeleteAttachment = (indexToDelete: Number) => {
    setFileUrl((prevUrls) =>
      prevUrls.filter((url, index, value) => index !== indexToDelete)
    );
  };
  //for api calls

  const handleSubmit = async () => {
    if (
      !newTicketInformation.title ||
      !newTicketInformation.description ||
      newTicketInformation.selectCategory === "SELECT CATEGORY"
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    handleCloseModal();
    // if (
    //   !newTicketInformation.title ||
    //   !newTicketInformation.description ||
    //   newTicketInformation.selectCategory === "SELECT CATEGORY"
    // ) {
    //   alert("Please fill in all the required fields.");
    //   return;
    // }

    // try {
    //   const payload = {
    //     title: newTicketInformation.title,
    //     description: newTicketInformation.description,
    //     category: newTicketInformation.selectCategory,
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
        maxWidth="lg"
      >
        <div>
          {id ? (
            <DialogTitle className="Header">EDIT TICKET</DialogTitle>
          ) : (
            <DialogTitle className="Header">CREATE NEW TICKET</DialogTitle>
          )}

          <DialogContent>
            <TextField
              value={newTicketInformation.title}
              onChange={(e) => {
                setnewTicketInformation({
                  ...newTicketInformation,
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
              value={newTicketInformation.description}
              onChange={(e) => {
                setnewTicketInformation({
                  ...newTicketInformation,
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
              rows={4}
              sx={{ marginBottom: "20px" }}
            />

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth
              margin="none"
              required
              defaultValue="SELECT CATEGORY"
              autoFocus
              name="SelectCategory"
              type="text"
              value={newTicketInformation.selectCategory}
              sx={{ marginBottom: "30px" }}
              onChange={(e) => {
                setnewTicketInformation({
                  ...newTicketInformation,
                  selectCategory: e.target.value,
                });
              }}
            >
              <MenuItem value={"SELECT CATEGORY"} disabled>
                SELECT CATEGORY
              </MenuItem>
              <MenuItem value={"TECHNICAL SUPPORT"}>TECHNICAL SUPPORT</MenuItem>
              <MenuItem value={"HR"}>HR</MenuItem>
            </Select>

            <Container maxWidth="md">
              <Stack
                direction="row"
                spacing={2}
                alignItems={"flex-start"}
                justifyContent={"flex-start"}
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

                {fileUrl.map((url, index) => (
                  <React.Fragment key={index}>
                    {url.startsWith("data:image") ? (
                      <div>
                        <img src={url} alt={`Uploaded ${index}`} height="100" />
                        <IconButton
                          onClick={() => handleDeleteAttachment(index)}
                          size="small"
                        >
                          <DeleteIcon></DeleteIcon>
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
                          <DeleteIcon></DeleteIcon>
                        </IconButton>
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </Stack>
            </Container>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>

            {id ? (
              <Button variant="contained" onClick={handleSubmit} size="small">
                EDIT TICKET
              </Button>
            ) : (
              <Button variant="contained" onClick={handleSubmit} size="small">
                CREATE NEW TICKET
              </Button>
            )}
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

export default TicketCreation;
