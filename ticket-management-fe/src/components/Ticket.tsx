import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link/Link";
import { useState } from "react";

import { getAllCategories } from "../api/baseapi";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { createTicket, updateTicket } from "../api/baseapi";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { deleteTicket } from "../api/baseapi";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TicketList } from "./TicketBoard";
import { useEffect } from "react";
import { getAllTickets } from "../api/baseapi";

interface TicketProps {
  id: number;
  selectedTicket: any;
  setShowTicket: any;
  setNewTicketId: any;
}
interface Attachment {
  id: number;
  filename: string;
  filepath: string;
}
interface TicketProps {
  id: number;
  selectedTicket: any;
  setLocaltickets:React.Dispatch<React.SetStateAction<TicketList[]>>;
}

  
 

function Ticket({
  id,
  selectedTicket,
  setShowTicket,
  setNewTicketId,
  setLocaltickets
}: TicketProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    getAllCategories().then((res) => {
      setticketInformation((prevTicketInfo) => ({
        ...prevTicketInfo,
        category_id: res.length > 0 ? res[0].name : "",
      }));

      setCategories(res);
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
      filepath: "",
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

  const [categories, setCategories] = useState<Category[]>([]);
  const [ticketInformation, setticketInformation] = useState<{
    title: string;
    description: string;
    category_id: number | string;
    priority: string;
    assignee: number;
    created_by: number;
    filepath: string;

    file: File[];
  }>({
    title: "",
    description: "",
    category_id: 0,
    priority: "Select Priority",
    assignee: 0,
    filepath: "",
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
    setticketInformation({
      title: selectedTicket.title,
      description: selectedTicket.description,
      category_id: selectedTicket.category.name,

      filepath: selectedTicket.attachments
        .map((attachment: Attachment) => attachment.filepath)
        .join(", "),
      priority: selectedTicket.priority,

      created_by: selectedTicket.created_by,
      assignee: selectedTicket.assignee,
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
    getAllCategories();
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
      ticketInformation.category_id === null ||
      ticketInformation.priority === "Select Priority"
    ) {
      toast.error("Please fill all the required fields", { theme: "light",autoClose:1500,position:"top-center" });

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
        let createResponse = await createTicket(formData);

        if (createResponse === 201) {
          toast("Ticket created successfully.", { theme: "light",autoClose:1500,position:"top-center" });
          getAllTickets().then((res)=>{
            setLocaltickets(res)
          })
          handleCloseModal();
          return;
        }
        if (createResponse === 401) {
          toast("Unauthorized", { theme: "light",autoClose:1500,position:"top-center" });
        }
        if (createResponse === 404) {
          toast("Validation error: invalid data format.", { theme: "light",autoClose:1500,position:"top-center" });
        } else {
          toast("An error occurred while submitting the form .", { theme: "light",autoClose:1500,position:"top-center" });
        }
      } catch (error) {}
    } else {
      let editResponse = await updateTicket(formData, id);

      if (editResponse === 200) {
        toast("Ticket edited successfully.", { theme: "light",autoClose:1500,position:"top-center" });
        getAllTickets().then((res)=>{
          setLocaltickets(res)
        })
        handleCloseModal();
        return;
      }
      if (editResponse === 401) {
        toast("Unauthorized", { theme: "light",autoClose:1500,position:"top-center" });
      }
      if (editResponse === 404) {
        toast("Validation error: invalid data format.");
      } else {
        toast("An error occurred while editing the form .");
      }
    }
  };

   const deleteTicketHandler=(id:number)=>{
    deleteTicket(id);
 getAllTickets().then((res)=>{
  console.log(res)
  setLocaltickets(res)
 })
 handleCloseModal();   toast(`Ticket#${id} Deleted Successfully`, { theme: "light",autoClose:1500,position:"top-center" }); 
   }

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
              defaultValue="Select Category"
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
              <MenuItem value={"Select Category"} disabled>
                Select Category
              </MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>

            <TextField
              value={ticketInformation.assignee}
              onChange={(e) => {
                setticketInformation({
                  ...ticketInformation,
                  assignee: parseInt(e.target.value),
                });
              }}
              margin="normal"
              required={id === null || id === 0}
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
              required={id === null || id === 0}
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
              {ticketInformation.filepath && (
                <Link
                  href={
                    "https://a974-210-16-94-97.ngrok-free.app/" +
                    ticketInformation.filepath
                  }
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
                  View Attachment
                </Link>
              )}
            </Stack>

            <DialogActions>
              <Button onClick={handleCloseModal}>Cancel</Button>

              <Button variant="contained" onClick={handleSubmit} size="small">
                {id ? "EDIT TICKET" : "CREATE NEW TICKET"}
              </Button>
              {/* {id &&  <Button color="error" variant="contained" onClick={()=>{  deleteTicketHandler(id)  }} size="small">DELETE TICKET</Button>} */}
             
               
              
            </DialogActions>
          </DialogContent>
        </div>
      </Dialog>
    </div>
  );
}
export default Ticket;


