"use client";
import { IoSparkles } from "react-icons/io5";
import { FormErrorMessage, onInputChange } from "@/shared";
import { useNameGeneratorForm } from "../hooks/useNameGeneratorForm";

export const GenerateNamesForm = () => {
  const { error, formData, setFormData, onSubmit, isLoading } =
    useNameGeneratorForm();

  return (
    <form
      onSubmit={onSubmit}
      className="border w-full lg:w-6/12 p-5 rounded shadow-lg backdrop-filter backdrop-blur-sm bg-white/20 min-h-fit"
    >
      <h2 className="text-center text-2xl font-semibold text-gray-800  mb-4">
        Generar nombres
      </h2>

      <FormErrorMessage error={error} />

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <label
            htmlFor="keywords"
            className="text-sm font-medium text-gray-700 "
          >
            Palabras claves
          </label>
          <input
            type="text"
            id="keywords"
            name="keywords"
            placeholder="Ej. Tecnologia, celular, app"
            className=" p-2 border-2 rounded-md border-blue-600 focus:outline-none focus:border-blue-600 bg-white/40"
            onChange={(e) => onInputChange(e, setFormData)}
            value={formData.keywords}
            maxLength={100}
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
            className="ext-sm font-medium text-gray-700 "
          >
            Estilo
          </label>
          <select
            id="style"
            name="style"
            onChange={(e) => onInputChange(e, setFormData)}
            value={formData.style}
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
        className={`w-full flex justify-center items-center bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white mt-5 py-2 rounded-md
            ${
              isLoading
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer opacity-100"}
          `}
      >
        <IoSparkles className="mr-2" size={20} />
        {isLoading ? "Generando..." : "Generar"}
      </button>
    </form>
  );
};
