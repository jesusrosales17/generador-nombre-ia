"use client"
import { addFavorite, removeFavorite } from "@/shared/services/FavoritesService";
import { useAppDispatch } from "@/store";
import { NameObject } from "@/store/interfaces/namesObject";
import { updateName } from "@/store/names/namesSlice";
import { useState } from "react";
import { ImHeart } from "react-icons/im";
import { IoHeartOutline } from "react-icons/io5";



export const NameItem = ({ name, description, isFavorite }: NameObject) => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState(isFavorite ?? false);

  const handleToggleFavorite = () => {
    
    if (selected) {
      removeFavorite(name);
      dispatch(updateName({ name, description, isFavorite: false }));
    } else {
      addFavorite({ name, description, isFavorite: true });
      dispatch(updateName({ name, description, isFavorite: true }));
    }
    setSelected(!selected);
  };
  

  return (
    <div className="flex-col   rounded-lg shadow-lg border p-4 flex justify-between gap-3">
      <div>
        <h4 className="font-bold  text-center lg:text-left text-blue-900 mb-2font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 ">{name}</h4>
        <p className="text-gray-600 text-sm mt-4">{description}</p>
      </div>
      <button onClick={handleToggleFavorite} className="w-auto self-end">
        {
          selected ?
          <ImHeart className="text-red-600" size={23} /> :  
          <IoHeartOutline className="text-red-600" size={23} />
        }
      </button>
    </div>
  );
};
