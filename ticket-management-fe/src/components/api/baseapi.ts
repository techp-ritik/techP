const getAllTickets = async () => {
  try {
    const response = await fetch(
      "https://a974-210-16-94-97.ngrok-free.app/v1/tickets",
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
const getAllCatgories = async () => {
  try {
    const response = await fetch(
      "https://a974-210-16-94-97.ngrok-free.app/v1/categories",
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
const filterTickets = async (params?:string,value?:string|number|Date) => {
  try {
    const response = await fetch(
      `https://a974-210-16-94-97.ngrok-free.app/v1/tickets?${params}=${value}`,
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
      `https://a974-210-16-94-97.ngrok-free.app/v1/ticket/${id}`,
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
const deleteTicket = async (id: number): Promise<void> => {
  try {
    const response = await fetch(
      `https://a974-210-16-94-97.ngrok-free.app/v1/ticket/${id}`,
      {
        headers: { "ngrok-skip-browser-warning": "true" },
        method: "DELETE",
      }
    );
    if (!response.ok) {
    
      throw new Error("Network response was not ok");
    }
    
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
        `https://a974-210-16-94-97.ngrok-free.app/v1/ticket/?id=${id}`,
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

export { getAllTickets, getTicket, updateTicketStatus ,filterTickets,getAllCatgories,deleteTicket};
