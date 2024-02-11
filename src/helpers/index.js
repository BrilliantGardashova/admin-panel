export const validate = (name, value) => {
    let error = "";
  
    switch (name) {
      case "tittle": 
        if (value.length < 3) {
          error = "Text must be at least 3 characters";
        }
        break;
      case "description": 
        if (value.length < 10) {
          error = "Text must be at least 10 characters";
        }
        break;  
      case "price": 
        if (value.length < 1) {
          error = "Text must be at least 10 characters";
        }
        break;  
       default:
        break;
    }
  
  
    return error;
  };
  
  
  