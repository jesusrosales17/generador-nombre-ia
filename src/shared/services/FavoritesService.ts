import { NameObject } from "@/store/interfaces/namesObject";

export const getFavorites = (): NameObject[] => {
  return JSON.parse(localStorage.getItem("names") || "[]");
};

export const addFavorite = (nameObject: NameObject) => {
  const favorites = getFavorites();
  const updatedFavorites = [...favorites, { ...nameObject, isFavorite: true }];
  localStorage.setItem("names", JSON.stringify(updatedFavorites));
};

export const removeFavorite = (name: string) => {
  const favorites = getFavorites();
  const updatedFavorites = favorites.filter((fav) => fav.name !== name);
  localStorage.setItem("names", JSON.stringify(updatedFavorites));
};

export const isFavorite = (name: string): boolean => {
  const favorites = getFavorites();
  return favorites.some((fav) => fav.name === name);
};
