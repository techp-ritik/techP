const baseUrl = "https://b26c-103-184-105-238.ngrok-free.app/v1/";
const token = JSON.parse(
  localStorage.getItem("access_token") || "{}"
).access_token;

const header = {
  Authorization: `Bearer ${token}`, // Include the token in the Authorization header
  Accept: "application/json",
  "ngrok-skip-browser-warning": "true",
};
const requestOptions = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
    Accept: "application/json",
    "ngrok-skip-browser-warning": "true",
  },
};

export const getAllTickets = async () => {
  try {
    console.log(token);
    const response = await fetch(`${baseUrl}tickets`, requestOptions);
    console.log(token);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const deleteTicket = async (id: number): Promise<void> => {
  try {
    const response = await fetch(`${baseUrl}ticket/${id}`, {
      headers: header,
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (err) {
    console.log(err);
  }
};
export const getTicket = async (id: number): Promise<void> => {
  try {
    const response = await fetch(
      `${baseUrl}ticket/${id}`,

      {
        headers: header,
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
export const updateTicketStatus = async (
  id: number | string,
  status: string
) => {
  try {
    const formData = new FormData();
    formData.append("status", status);
    if (id !== "") {
      const response = await fetch(
        `${baseUrl}ticket/?id=${id}`,

        {
          method: "PUT",
          body: formData,
          headers: header,
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
export const filterTickets = async (params: any) => {
  try {
    let query = `tickets/?${params.map((item: any, index: any) => {
      if (item.value !== "") {
        let param = `${index == 0 ? "" : "&"}` + item.key + "=" + item.value;
        return param;
      }
      return "";
    })}`;
    query = query.replaceAll(",", "");
    const response = await fetch(`${baseUrl + query}`, {
      headers: header,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const createTicket = async (formData: FormData) => {
  try {
    const response = await fetch(
      `${baseUrl}ticket`,

      {
        method: "POST",
        body: formData,
        headers: header,
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const createdata = await response.status;
    return createdata;
  } catch (error) {
    return error;
  }
};
export const updateTicket = async (formData: FormData, id: number) => {
  try {
    const response = await fetch(`${baseUrl}ticket?id=${id}`, {
      method: "PUT",
      body: formData,
      headers: header,
    });
    const editData = await response.status;
    return editData;
  } catch (error) {
    return error;
  }
};
export const createCategory = async (formData: FormData) => {
  try {
    const response = await fetch(
      `${baseUrl}categories`,

      {
        method: "POST",
        body: formData,
        headers: header,
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const createCategory = await response.status;
    return createCategory;
  } catch (error) {
    return error;
  }
};
export const getAllCategories = async () => {
  try {
    const response = await fetch(
      `${baseUrl}categories/`,

      {
        headers: header,
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
export const editCategory = async (id: number, formData: FormData) => {
  try {
    const response = await fetch(`${baseUrl}categories/${id}`, {
      method: "PUT",
      body: formData,
      headers: header,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const editData = await response.status;
    return editData;
  } catch (err) {
    console.log(err);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await fetch(
      `${baseUrl}users/`,

      {
        headers: header,
        method: "GET",
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteUserApi = async (id: number) => {
  try {
    const response = await fetch(`${baseUrl}users/${id}`, {
      headers: header,
      method: "DELETE",
    });
    const deleteuser = await response.status;

    return deleteuser;
  } catch (err) {
    console.log(err);
  }
};

export const createUser = async (userData: any) => {
  try {
    const response = await fetch(
      `${baseUrl}users/`,

      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: header,
      }
    );

    const createUserStatus = await response.status;

    return createUserStatus;
  } catch (error) {
    return error;
  }
};

export const editUser = async (userData: any, id: number) => {
  console.log(id);
  try {
    const response = await fetch(`${baseUrl}users/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: header,
    });
    const editData = await response.status;
    return editData;
  } catch (error) {
    return error;
  }
};

export const signIn = async (formdata: FormData) => {
  try {
    const response = await fetch(
      `${baseUrl}users/token`,

      {
        method: "POST",
        body: formdata,
        headers: {
          "ngrok-skip-browser-warning": "true",
        },
      }
    );
    if (!response.ok) {
      return response.status;
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    return error;
  }
};

export const Forgetpasswordlink = async (formdata: any) => {
  try {
    const response = await fetch(
      `${baseUrl}forgot-password`,

      {
        method: "POST",
        body: JSON.stringify(formdata),
        headers: {
          "ngrok-skip-browser-warning": "true",
          'Content-Type': 'application/json'
        },
      }
    );
    if (!response.ok) {
      return response.status;
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    return error;
  }
};

export const Forgetpasswordreset = async (formdata: any,email:string) => {
  try {
    const response = await fetch(
      `${baseUrl}forgot-password/reset/${email}`,

      {
        method: "POST",
        body: JSON.stringify(formdata),
        headers: {
          "ngrok-skip-browser-warning": "true",
          'Content-Type': 'application/json'
        },
      }
    );
    if (!response.ok) {
      return response.status;
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    return error;
  }
};
