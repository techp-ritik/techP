const baseUrl = "https://e053-103-177-83-247.ngrok-free.app/v1/"
export const getAllTickets = async () => {
    try {
      const response = await fetch( 
        `${baseUrl}tickets`,
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
  export const deleteTicket = async (id: number): Promise<void> => {
    try {
      const response = await fetch(
      
        `${baseUrl}ticket/${id}`,
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
  export const getTicket = async (id: number): Promise<void> => {
    try {
      const response = await fetch(
        `${baseUrl}ticket/${id}`,
       
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
  export const createTicket = async(formData : FormData) =>{
    try {
        const response = await fetch(
            `${baseUrl}ticket`,
         
            {
              method: "POST",
              body: formData,
              headers: { "ngrok-skip-browser-warning": "true" },
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
            "ngrok-skip-browser-warning": "true",
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
              headers: { "ngrok-skip-browser-warning": "true" },
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
  export const editCategory = async (id : number , formData : FormData) =>{
    try {
      const response = await fetch(
     
        `${baseUrl}categories/${id}`,
        {
          method: "PUT",
          body: formData,
          headers: {
            "ngrok-skip-browser-warning": "true",
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
  
  export{}
  
  
  