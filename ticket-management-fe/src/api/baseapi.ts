export const baseUrl = "https://aea9-210-16-94-101.ngrok-free.app/v1/";
const token = JSON.parse(
  localStorage.getItem("access_token") || "{}"
).access_token;

const loginHeader = {
  "ngrok-skip-browser-warning": "true",
};

const header = {
  "ngrok-skip-browser-warning": "true",
  "Content-Type": "application/json",
};
const ticketHeader={
  "ngrok-skip-browser-warning": "true"  , 
  Authorization: `Bearer ${token}`
}
const defaultHeaders = {
  "ngrok-skip-browser-warning": "true",
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

const createFetchInstance = (
  url: any,
  method: string,
  defaultHeaders: any,
  body?: any
) => {
  return fetch(url, {
    method,
    headers: defaultHeaders,
    body,
  });
};

export const getAllTickets = async () => {
  try {
    const response =  await fetch( 
      `${baseUrl}tickets`,
      {
        headers: { "ngrok-skip-browser-warning": "true" , Authorization: `Bearer ${JSON.parse(
          localStorage.getItem("access_token") || "{}"
        ).access_token}` },
      }
    );
  
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    
  }
};
export const deleteTicket = async (id: number): Promise<void> => {
  try {
    const response = await createFetchInstance(
      `${baseUrl}ticket/${id}`,
      "DELETE",
      defaultHeaders
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (err) {
    ;
  }
};
export const getTicket = async (id: number): Promise<void> => {
  try {
    const response = await createFetchInstance(
      `${baseUrl}ticket/${id}`,
      "GET",
      defaultHeaders
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    ;
  }
};

// export const filterTickets = async (params: any) => {
//   try {
//     let query = `tickets/?${params.map((item: any, index: any) => {
//       if (item.value !== "") {
//         let param = `${index === 0 ? "" : "&"}` + item.key + "=" + item.value;
//         return param;
//       }
//       return "";
//     })}`;
//     query = query.replaceAll(",", "");
//     const response = await fetch(`${baseUrl + query}`, {
//       headers: { "ngrok-skip-browser-warning": "true" , Authorization: `Bearer ${JSON.parse(
//         localStorage.getItem("access_token") || "{}"
//       ).access_token}` },
//     });

//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }

//     const data = await response.json();
//     return data;
//   } catch (err) {
//     ;
//   }
// };
export const filterTickets = async (params: any) => {
  try {
    let query = `tickets/?${params.map((item: any, index: any) => {
      if (item.value !== "") {
        let param = `${index === 0 ? "" : "&"}` + item.key + "=" + item.value;
        return param;
      }
      return "";
    })}`;
    query = query.replaceAll(",", "");
    const response = await fetch(`${baseUrl + query}`, {
      headers: { "ngrok-skip-browser-warning": "true" , Authorization: `Bearer ${JSON.parse(
        localStorage.getItem("access_token") || "{}"
      ).access_token}` },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    ;
  }
};
export const createTicket = async (formData: FormData) => {
  try {
    const response = await createFetchInstance(
      `${baseUrl}ticket`,
      "POST",
      ticketHeader,
      formData
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

export const updateTicket = async (
  id: number | string,
  formData?: FormData,

) => {
  try {
            if (id !== "") {
              const response = await createFetchInstance(
                `${baseUrl}ticket/?id=${id}`,
                "PUT",
                ticketHeader,
                formData
              );
        
              return response.status;
            } else {
              console.log("nochange", id);
            }
          } catch (error) {
            return error;
          }
     
 
};
export const createCategory = async (categoryData: any) => {
  try {
    const response = await createFetchInstance(
      `${baseUrl}categories`,
      "POST",
  
      defaultHeaders,JSON.stringify(categoryData)

   




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
    const response = await createFetchInstance(
      `${baseUrl}categories/`,
      "GET",
      defaultHeaders
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (err) {
    ;
  }
};
export const editCategory = async (id: number, categoryData: any) => {
  try {
    const response = await createFetchInstance(
      `${baseUrl}categories/${id}`,
      "PUT",
      // ticketHeader,
      // formData

      defaultHeaders,JSON.stringify(categoryData)
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const editData = await response.status;
    return editData;
  } catch (err) {
    ;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await createFetchInstance(
      `${baseUrl}users/`,
      "GET",
      defaultHeaders
    );

    const data = await response.json();
    return data;
  } catch (err) {
    ;
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await createFetchInstance(
      `${baseUrl}users/${id}`,
      "DELETE",
      defaultHeaders
    );

    const deleteuser = await response.status;

    return deleteuser;
  } catch (err) {
    ;
  }
};

export const createUser = async (userData: any) => {
  try {
    const response = await createFetchInstance(`${baseUrl}users/`,"POST",defaultHeaders,JSON.stringify(userData))


    const createUserStatus = response.status;

    return createUserStatus;
  } catch (error) {
    return error;
  }
};

export const editUser = async (userData: any, id: number) => {
  try {
    const response = await createFetchInstance(`${baseUrl}users/${id}`,"PUT",defaultHeaders,JSON.stringify(userData))
   
    const editData =  response.status;
    return editData;
  } catch (error) {
    return error;
  }
};

export const signIn = async (formdata: FormData) => {
  try {
    const response = await createFetchInstance(
      `${baseUrl}users/token`,
      "POST",
      loginHeader,
      formdata
    );

    if (!response.ok) {
      return response.status;
    
    }
    return response.json();
  } catch (error) {
    return error;
  }
};

export const forgetpasswordlink = async (formdata: any) => {
  try {
    const response = await createFetchInstance(
      `${baseUrl}forgot-password`,
      "POST",
      header,
      JSON.stringify(formdata)
    );

    if (!response.ok) {
      return response.status;
      
    }
    return response.json();
  } catch (error) {
    return error;
  }
};

export const forgetpasswordreset = async (formdata: any, email: string) => {
  try {
    const response = await createFetchInstance(
      `${baseUrl}forgot-password/reset/${email}`,
      "POST",
      header,
      JSON.stringify(formdata)
    );

    if (!response.ok) {
      return response.status;
   
    }
    return response.json();
  } catch (error) {
    return error;
  }
};

export const getAllAssignees = async () => {
  try {
    const response = await fetch(
      `${baseUrl}users/assignees/`,

      {
        headers: {
          "ngrok-skip-browser-warning": "true",
          Authorization: `Bearer ${token}`,
        },
        method: "GET",
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const assignees = await response.json();
    return assignees;
  } catch (err) {
  ;
  }
};