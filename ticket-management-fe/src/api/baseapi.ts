
// export const getCreateTicket = async(formData : FormData) =>{

//     try {
//         const response = await fetch(
//             "https://6886-103-177-83-247.ngrok-free.app/v1/ticket",
  
//             {
//               method: "POST",
//               body: formData,
//               headers: { "ngrok-skip-browser-warning": "true" },
//             }
//           );
   
//           if (!response.ok) {
//             throw new Error("Network response was not ok");
//           }
//           const createdata = await response.status;
       
//           return createdata;
        
  
// }catch (error) {
//     alert("An error occurred while submitting the form.");
//     console.error(error);
//   }
// }




// export const getTicket = async (id: number): Promise<void> => {
//   try {
//     const response = await fetch(
//       `https://a974-210-16-94-97.ngrok-free.app/v1/ticket/${id}`,
//       {
//         headers: { "ngrok-skip-browser-warning": "true" },
//         method: "GET",
//       }
//     );
//     if (!response.ok) {
    
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//     return data;
//   } catch (err) {
//     console.log(err);
//   }
// };

// export const updateTicketStatus = async (id: number | string, status: string) => {
//   try {
//     const formData = new FormData();
//     formData.append("status", status);
//     if (id !== "") {
      
//       // Editing an existing ticket, make a PUT request
//       const response = await fetch(
//         `https://a974-210-16-94-97.ngrok-free.app/v1/ticket/?id=${id}`,
//         {
//           method: "PUT",
//           body: formData,
//           headers: {
//             "ngrok-skip-browser-warning": "true",
//           },
//         }
//       );
//       const editData =  await response.status;
//       return editData;
//     }
//   } catch (error) {
//     console.error(error);
//   }
// };

// export const createTicket = async(formData : FormData) =>{

//   try {
//       const response = await fetch(
//           "https://a974-210-16-94-97.ngrok-free.app/v1/ticket",

//           {
//             method: "POST",
//             body: formData,
//             headers: { "ngrok-skip-browser-warning": "true" },
//           }
//         );
 
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const createdata = await response.status;
     
//         return createdata;
      

// }catch (error) {
//   return error;

// }
// }

// export const updateTicket = async (formData : FormData , id : number )  =>{
//   try{


//   const response = await fetch(
//       `https://a974-210-16-94-97.ngrok-free.app/v1/ticket?id=${id}`,

//       {
//         method: "PUT",
//         body: formData,

//         headers: {
//           "ngrok-skip-browser-warning": "true",
//         },
//       }
//     );
//     const editData =  await response.status;
  
//     return editData;
//   }catch (error) {
//     return error;
//   }
// }


export const getAllTickets = async () => {
  try {
    const response = await fetch(
      "https://6c4b-210-16-94-97.ngrok-free.app/v1/tickets",
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
      `https://a270-210-16-94-97.ngrok-free.app/v1/ticket/${id}`,
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
      `https://6c4b-210-16-94-97.ngrok-free.app/v1/ticket/${id}`,
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
      // Editing an existing ticket, make a PUT request
      const response = await fetch(
        `https://6c4b-210-16-94-97.ngrok-free.app/v1/ticket/?id=${id}`,
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
export const filterTickets = async (params?:string,value?:string|number|Date) => {
  try {
    const response = await fetch(
      `https://6c4b-210-16-94-97.ngrok-free.app/v1/tickets?${params}=${value}`,
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
          "https://6c4b-210-16-94-97.ngrok-free.app/v1/ticket",
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
      `https://6c4b-210-16-94-97.ngrok-free.app/v1/ticket?id=${id}`,
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
          "https://6c4b-210-16-94-97.ngrok-free.app/v1/categories",
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
      "https://6c4b-210-16-94-97.ngrok-free.app/v1/categories/",
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
      `https://6c4b-210-16-94-97.ngrok-free.app/v1/categories/${id}`,
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


