"use client";
import { useState } from "react";
import { FormData } from "../interfaces/formData";
import { useAppDispatch } from "@/store";
import { setNames } from "@/store/names/namesSlice";

export const useNameGeneratorForm = () => {
  const [formData, setFormData] = useState<FormData>({ keywords: "", style: "Creativo" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();


  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!formData.keywords) {
      setError("Todos los campos son obligatorios");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setError("Error al generar nombres");
        return;
      }

      const result = await response.json();
      dispatch(setNames(result.data));
    } catch (error) {
      setError("Ocurrió un error inesperado");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    setFormData,
    error,
    isLoading,
    onSubmit,
  };
};
