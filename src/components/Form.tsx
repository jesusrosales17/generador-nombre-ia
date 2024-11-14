"use client";
import { ErrorMessage } from "./ErrorMessage";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setNames } from "@/store/names/namesSlice";
import { IoSparkles } from "react-icons/io5";

export const Form = () => {
  const [data, setData] = useState({
    keywords: "",
    style: "Creativo",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dispath = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!data.keywords || !data.style) {
      setError("Todos los campos son obligatorios");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          keywords: data.keywords,
          style: data.style,
        }),
      });

      const resp = await response.json();

      if(resp.error) {
        
        setError(resp.error);
        setIsLoading(false);
        return;
      }

      setError(null);

      dispath(setNames(resp));
      setIsLoading(false);
    } catch (error: Error | unknown) {
      if(error instanceof Error) {
        setError(error.message);
      } else {
        setError("Ocurrio un error inesperado.");
      }
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="border w-full lg:w-6/12 p-5 rounded shadow-lg backdrop-filter backdrop-blur-lg bg-white/20 min-h-fit"
    >
      <h2 className="text-center text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
        Generar nombres
      </h2>

      {error && <ErrorMessage error={error} />}

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="keywords"
            className="text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Palabras claves
          </label>
          <input
            type="text"
            id="keywords"
            name="keywords"
            placeholder="Ej. Tecnologia, celular, app"
            className=" p-2 border-2 rounded-md border-blue-600 focus:outline-none focus:border-blue-600 bg-white/40"
            onChange={handleChange}
            value={data.keywords}
          />
          <p>
            <small className="text-xs text-gray-500">
              *Separa las palabras con comas
            </small>
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="style"
            className="ext-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Estilo
          </label>
          <select
            id="style"
            name="style"
            onChange={handleChange}
            value={data.style}
            className="p-2  border-2 rounded-md border-blue-600 focus:outline-none focus:border-blue-600 text-blue-900 bg-white/40"
          >
            <option value="Creativo">Creativo</option>
            <option value="Formal">Formal</option>
            <option value="Divertido">Divertido</option>
            <option value="Corto">Corto</option>
            <option value="Elegante">Elegante</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white mt-5 py-2 rounded-md"
      >
        <IoSparkles className="mr-2" size={20} />
        {isLoading ? "Generando..." : "Generar"}
      </button>
    </form>
  );
};
