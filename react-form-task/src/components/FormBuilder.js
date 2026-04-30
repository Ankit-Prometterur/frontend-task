import { useState } from "react";
import FormHeader from "./FormHeader";

const FormBuilder = () => {
  const [form, setForm] = useState({
    title: "Untitled form",
    description: "",
    
  });
  const handleHeaderChange = (field, value) => {
     setForm((prev) => ({
        ...prev,
        [field]: value
     }));
  };
  return (
    <div className="form-container">
      <FormHeader title = {form.title} description = {form.description} onChangeInput={handleHeaderChange}/>

      
    </div>
  );
};

export default FormBuilder;
