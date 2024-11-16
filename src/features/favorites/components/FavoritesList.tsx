import React from "react";
import { EmptyMessage, NameItem } from "@/shared";
import { NameObject } from "@/store/interfaces/namesObject";

export const FavoritesList = () => {
  const namesFovarites: NameObject[] = JSON.parse(
    localStorage.getItem("names") || "[]"
  );

  return (
    <div className=" flex flex-col gap-3 mt-3">
      {namesFovarites.length == 0 && (
        <EmptyMessage message="No se encontraron nombres favoritos" />
      )}

      {namesFovarites.length > 0 &&
        namesFovarites.map((name, i) => <NameItem key={i} {...name} />)}
    </div>
  );
};
