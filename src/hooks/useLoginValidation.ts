
import { useState, useEffect } from "react";
import { isValidEmail, isValidPhone } from "@/utils/security";

interface FormData {
  identifier: string;
  password: string;
}

interface Validation {
  identifier: boolean;
  password: boolean;
}

export const useLoginValidation = () => {
  const [formData, setFormData] = useState<FormData>({
    identifier: "",
    password: "",
  });
  
  const [validation, setValidation] = useState<Validation>({
    identifier: false,
    password: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Basic validation
    if (name === "identifier") {
      // Use the updated security utils for validation
      const isValidEmailFormat = isValidEmail(value);
      const isValidSAPhone = isValidPhone(value);
      
      setValidation((prev) => ({
        ...prev,
        identifier: isValidEmailFormat || isValidSAPhone,
      }));
    } else if (name === "password") {
      setValidation((prev) => ({
        ...prev,
        password: value.length >= 8,
      }));
    }
  };

  return {
    formData,
    validation,
    handleChange,
  };
};
