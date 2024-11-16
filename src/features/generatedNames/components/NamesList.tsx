"use client";

import { useAppSelector } from "@/store";
import { EmptyMessage, NameItem } from "@/shared";

export const NamesList = () => {
  const names = useAppSelector((state) => state.names.names);
  return (
    <div className=" flex flex-col gap-3 mt-3">
      {names.length == 0 && (
        <EmptyMessage message="No se encontraron nombres generados" />
      )}

      {names.length > 0 &&
        names.map((name, i) => <NameItem key={i} {...name} />)}
    </div>
  );
};
