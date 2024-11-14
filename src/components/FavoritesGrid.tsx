import React from 'react'
import { NamesItem } from './NamesItem';
import { NameObject } from '@/store/names/namesSlice';

export const FavoritesGrid = () => {
  const namesFovarites: NameObject[] = JSON.parse( localStorage.getItem("names") || "[]");
  return (
    <div className=" flex flex-col gap-3 mt-3">
       
      {
        namesFovarites.length == 0 && 
        <p className="text-center text-gray-600 text-sm">
            No se encontraron favoritos
        </p>
      }

        {
            namesFovarites.length > 0 && 
            
            namesFovarites.map((name, i) => (
                <NamesItem key={i} {...name} />
            ))
        }
    </div>
  )
}
