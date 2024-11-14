import { useAppDispatch } from "@/store";
import { NameObject, selectName } from "@/store/names/namesSlice";
import React, { useState } from "react";
import { ImHeart } from "react-icons/im";
import { IoHeartOutline } from "react-icons/io5";



export const NamesItem = ({ name, description, isFavorite }: NameObject) => {
  const dispatch = useAppDispatch();
  const [selected, setSelected] = useState(isFavorite);

  const handleClick = () => {
    const names = JSON.parse(localStorage.getItem("names") || "[]");
   
    const existName = names.find((n: NameObject) => n.name === name);
    if(!existName) {
      localStorage.setItem("names", JSON.stringify([...names, { name, description, isFavorite: true }]));
      setSelected(!selected);
      dispatch(selectName({ name, description, isFavorite: true }));
      return;
    }

    const namesFilter = names.filter((n: NameObject) => n.name !== name);
    dispatch(selectName({ name, description, isFavorite: false }));
    localStorage.setItem("names", JSON.stringify(namesFilter));
    
    setSelected(!selected);
  };

  return (
    <div className="bg-white/30 flex-col  backdrop-blur-md rounded-lg shadow-lg border p-4 flex justify-between gap-3">
      <div>
        <h4 className="font-bold  text-center text-blue-900 mb-2font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">{name}</h4>
        <p className="text-gray-600 text-sm text- mt-4">{description}</p>
      </div>
      <button onClick={handleClick} className="w-auto self-end">
        {
          selected ?
          <ImHeart className="text-red-600" size={23} /> :  
          <IoHeartOutline className="text-red-600" size={23} />
        }
      </button>
    </div>
  );
};
