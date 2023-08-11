const baseUrl = "https://b49b-210-16-94-99.ngrok-free.app/v1/"
const token  =  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhdGhhcnYudmFzcGF0ZUBnbWFpbC5jb20iLCJleHAiOjE2OTE3NTQ2OTJ9.WoxQyRocuBYaLCf9BQdjQudOUwsEzWKBjIJrEuXztX0"



export const getAllTickets = async () => {
    try {
      const response = await fetch( 
        `${baseUrl}tickets`,
        {
          headers: { "ngrok-skip-browser-warning": "true" , Authorization: `Bearer ${token}` },
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
  export const deleteTicket = async (id: number): Promise<void> => {
    try {
      const response = await fetch(
      
        `${baseUrl}ticket/${id}`,
        {
          headers: { "ngrok-skip-browser-warning": "true"  , Authorization: `Bearer ${token}`},
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
  export const getTicket = async (id: number): Promise<void> => {
    try {
      const response = await fetch(
        `${baseUrl}ticket/${id}`,
       
        {
          headers: { "ngrok-skip-browser-warning": "true" , Authorization: `Bearer ${token}` },
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
  export const updateTicketStatus = async (id: number | string, status: string) => {
    try {
      const formData = new FormData();
      formData.append("status", status);
      if (id !== "") {

        const response = await fetch(
            `${baseUrl}ticket/?id=${id}`,
            
          {
            method: "PUT",
            body: formData,
            headers: {
              "ngrok-skip-browser-warning": "true", Authorization: `Bearer ${token}`
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
  export const filterTickets = async (params:any) => {
    try {
      let query = `tickets/?${params.map((item:any, index:any) => {
        if (item.value !== "") {
          let param = `${index == 0 ? "" : "&"}` + item.key + "=" + item.value;
          return param;
        }
        return "";
      })}`;
      query = query.replaceAll(",", "");
      const response = await fetch(
        `${baseUrl+query}`,
        {
          headers: { "ngrok-skip-browser-warning": "true" , Authorization: `Bearer ${token}` },
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
  export const createTicket = async(formData : FormData) =>{
    try {
        const response = await fetch(
            `${baseUrl}ticket`,
         
            {
              method: "POST",
              body: formData,
              headers: { "ngrok-skip-browser-warning": "true"  , Authorization: `Bearer ${token}`},
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const createdata = await response.status;
          return createdata;
  }catch (error) {
    return error;
  }
  }
  export const updateTicket = async (formData : FormData , id : number )  =>{
    try{
    const response = await fetch(
        
        `${baseUrl}ticket?id=${id}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            "ngrok-skip-browser-warning": "true", Authorization: `Bearer ${token}`
          },
        }
      );
      const editData =  await response.status;
      return editData;
    }catch (error) {
      return error;
    }
  }
  export const createCategory = async(formData : FormData) =>{
      try {
        const response = await fetch(
            `${baseUrl}categories`,
          
            {
              method: "POST",
              body: formData,
              headers: { "ngrok-skip-browser-warning": "true"  , Authorization: `Bearer ${token}`},
            }
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const createCategory = await response.status;
          return createCategory;
  }catch (error) {
    return error;
  }
  }
  export const getAllCategories = async () => {
    try {
      const response = await fetch(
        `${baseUrl}categories/`,
  
        {
          headers: { "ngrok-skip-browser-warning": "true"  , Authorization: `Bearer ${token}`},
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
  export const editCategory = async (id : number , formData : FormData) =>{
    try {
      const response = await fetch(
     
        `${baseUrl}categories/${id}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            "ngrok-skip-browser-warning": "true",Authorization: `Bearer ${token}`
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const editData =  await response.status;
      return editData;
    } catch (err) {
      console.log(err);
    }
  }

  export const getAllUsers = async () => {
    try {
      const response = await fetch(
        `${baseUrl}users/`,
   
        {
          headers: { "ngrok-skip-browser-warning": "true" , Authorization: `Bearer ${token}`},
          method: "GET",
        }
      );
 
      const data = await response.json();
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  

  export const deleteUserApi = async (id: number)=> {
    try {
      const response = await fetch(
      
        `${baseUrl}users/${id}`,
        {
          headers: { "ngrok-skip-browser-warning": "true" , Authorization: `Bearer ${token}` },
          method: "DELETE",
        }
      );
      const deleteuser = await response.status;
    
      return deleteuser;
      
    } catch (err) {
      console.log(err);
    }

  };

  export const createUser = async(userData : any) =>{
    try {
    
    
      const response = await fetch(
          `${baseUrl}users/`,
        
          {
            method: "POST",
            body : JSON.stringify(userData),
            headers: { "ngrok-skip-browser-warning": "true"  , "Content-Type": "application/json" , Authorization: `Bearer ${token}`},
          }
        );
  
        
        const createUserStatus = await response.status;
    
        return createUserStatus;
}catch (error) {
  return error;
}
}

export const editUser = async (userData : any , id : number )  =>{
  console.log(id);
  try{
  const response = await fetch(
      
      `${baseUrl}users/${id}`,
      {
        method: "PUT",
        body : JSON.stringify(userData),
        headers: {
          "ngrok-skip-browser-warning": "true",
           "Content-Type": "application/json",
           Authorization: `Bearer ${token}`
        },
      }
    );
    const editData =  await response.status;
    return editData;
  }catch (error) {
    return error;
  }
}








  export{}
  
 