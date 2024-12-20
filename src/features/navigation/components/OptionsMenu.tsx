"use client";
import { useState } from "react";
import { IoHeartOutline, IoStarOutline } from "react-icons/io5";
import { NamesList } from "@/features/generatedNames";
import { FavoritesList } from "@/features/favorites";

export const OptionsMenu = () => {
  const [option, setOption] = useState("resultados");
  return (
    <>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => setOption("resultados")}
          className={`flex items-center gap-2 ${
            option == "resultados"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              : "bg-white/30"
          }  rounded-lg shadow-lg border p-2`}
        >
          <IoStarOutline />
          Resultados
        </button>
        <button
          onClick={() => setOption("favoritos")}
          className={`flex items-center gap-2 ${
            option == "favoritos"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              : "bg-white/30"
          }   rounded-lg shadow-lg border p-2`}
        >
          <IoHeartOutline />
          Favoritos
        </button>
      </div>

      <hr className="mt-4 border-gray-300" />

      {option == "resultados" && <NamesList />}

      {option == "favoritos" && <FavoritesList />}
    </>
  );
};
