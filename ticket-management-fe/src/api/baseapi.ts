const baseUrl = "https://a717-210-16-94-96.ngrok-free.app/v1/";
const token = JSON.parse(
  localStorage.getItem("access_token") || "{}"
).access_token;

const loginHeader={
  "ngrok-skip-browser-warning": "true",
}

const header = {
  "ngrok-skip-browser-warning": "true",
  'Content-Type': 'application/json'
};
const defaultHeaders = {
  Authorization: `Bearer ${token}`,
  Accept: "application/json",
  "ngrok-skip-browser-warning": "true",
};

const createFetchInstance = (url:any, method:string, defaultHeaders:any,body?:any) => {
  return fetch(url, {
    method,
    headers:defaultHeaders,
    body
  });
};


export const getAllTickets = async () => {
  try {
    const response =await createFetchInstance(`${baseUrl}tickets`,"GET",defaultHeaders)
    
   
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
    const response = await createFetchInstance(`${baseUrl}ticket/${id}`,"DELETE",defaultHeaders)
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (err) {
    console.log(err);
  }
};
export const getTicket = async (id: number): Promise<void> => {
  try {
    const response = await createFetchInstance(`${baseUrl}ticket/${id}`,"GET",defaultHeaders)
   
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
      const response =await createFetchInstance(`${baseUrl}ticket/?id=${id}`,"PUT",defaultHeaders,formData)
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
      headers: defaultHeaders,
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
    const response =await createFetchInstance(`${baseUrl}ticket`,"POST",defaultHeaders,formData)
 
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
    const response =await createFetchInstance(`${baseUrl}ticket?id=${id}`,"PUT",defaultHeaders,formData)
 
    const editData =  response.status;
    return editData;
  } catch (error) {
    return error;
  }
};
export const createCategory = async (formData: FormData) => {
  try {
    const response = await createFetchInstance(`${baseUrl}categories`,"POST",defaultHeaders,formData)
   
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
    const response = await createFetchInstance(`${baseUrl}categories/`,"GET",defaultHeaders)
  
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
    const response = await createFetchInstance(`${baseUrl}categories/${id}`,"PUT",defaultHeaders,formData)
   
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
    const response =await createFetchInstance(`${baseUrl}users/`,"GET",defaultHeaders)
  
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const deleteUserApi = async (id: number) => {
  try {
    const response =await createFetchInstance(`${baseUrl}users/${id}`,"DELETE",defaultHeaders)
   
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
        headers: defaultHeaders,
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
      headers: defaultHeaders,
    });
    const editData = await response.status;
    return editData;
  } catch (error) {
    return error;
  }
};

export const signIn = async (formdata: FormData) => {
  try {
    const response = await createFetchInstance(`${baseUrl}users/token`,"POST",loginHeader,formdata)
 
  
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
    const response = await createFetchInstance(`${baseUrl}forgot-password`,"POST",header,JSON.stringify(formdata))
   
    if (!response.ok) {
      return response.status;
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    return error;
  }
};

export const forgetpasswordreset = async (formdata: any,email:string) => {
  try {
    const response = await createFetchInstance(`${baseUrl}forgot-password/reset/${email}`,"POST",header,JSON.stringify(formdata))
  
    
    if (!response.ok) {
      return response.status;
      throw new Error("Network response was not ok");
    }
    return response.json();
  } catch (error) {
    return error;
  }
};
