const getAllTickets = async () => {
  try {
    const response = await fetch(
      "https://cce6-103-177-83-247.ngrok-free.app/v1/tickets",
      {
        headers: { "ngrok-skip-browser-warning": "true" },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const getTicket = async (id: number): Promise<void> => {
  try {
    const response = await fetch(
      `https://cce6-103-177-83-247.ngrok-free.app/v1/ticket/${id}`,
      {
        headers: { "ngrok-skip-browser-warning": "true" },
        method: "GET",
      }
    );
    if (!response.ok) {
    
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

const updateTicketStatus = async (id: number | string, status: string) => {
  try {
    const formData = new FormData();
    formData.append("status", status);
    if (id !== "") {
      console.log("inside edit");
      // Editing an existing ticket, make a PUT request
      const response = await fetch(
        `https://cce6-103-177-83-247.ngrok-free.app/v1/ticket/?id=${id}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      return response;
    } else {
      console.log("nochange", id);
    }
  } catch (error) {
    console.error(error);
  }
};

export { getAllTickets, getTicket, updateTicketStatus };
