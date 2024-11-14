"use client";

import { useAppSelector } from "@/store";
import { NamesItem } from "./NamesItem";

const NamesGrid = () => {
    const names = useAppSelector((state) => state.names.names);
  return (
    <div className=" flex flex-col gap-3 mt-3">
       
      {
        names.length == 0 && 
        <p className="text-center text-gray-600 text-sm">
            No se encontraron nombres
        </p>
      }

        {
            names.length > 0 && 
            
            names.map((name, i) => (
                <NamesItem key={i} {...name} />
            ))
        }
    </div>
  )
}

export default NamesGrid
