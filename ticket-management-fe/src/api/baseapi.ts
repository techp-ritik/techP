
export const getCreateTicket = async(formData : FormData) =>{

    try {
        const response = await fetch(
            "https://cce6-103-177-83-247.ngrok-free.app/v1/ticket",
  
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
    alert("An error occurred while submitting the form.");
    console.error(error);
  }
}


export const getUpdateTicket = async (formData : FormData , id : number )  =>{
    try{

 
    const response = await fetch(
        `https://cce6-103-177-83-247.ngrok-free.app/v1/ticket?id=${id}`,

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
      alert("An error occurred while submitting the form.");
      console.error(error);
    }
  }
     



    
       
    