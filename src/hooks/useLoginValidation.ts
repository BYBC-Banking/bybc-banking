
import { useState, useEffect } from "react";

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
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^(\+27|0)[0-9]{9}$/; // South African phone format
      setValidation((prev) => ({
        ...prev,
        identifier: emailRegex.test(value) || phoneRegex.test(value),
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
