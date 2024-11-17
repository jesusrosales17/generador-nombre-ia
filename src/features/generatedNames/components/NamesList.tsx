"use client";

import { useAppSelector } from "@/store";
import { EmptyMessage, NameItem } from "@/shared";

export const NamesList = () => {
  const arrayObjectNames = useAppSelector((state) => state.names.names);
  return (
    <div className=" flex flex-col gap-3 mt-3">
      {arrayObjectNames.length == 0 && (
        <EmptyMessage message="No se encontraron nombres generados" />
      )}

      {arrayObjectNames.length > 0 &&
        arrayObjectNames.map((objectName) => <NameItem key={objectName.name} {...objectName} />)}
    </div>
  );
};
