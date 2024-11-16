export const onInputChange = <T extends object>(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setState: React.Dispatch<React.SetStateAction<T>>
) => {
  const { name, value } = e.target;

  setState((prev) => ({ ...prev, [name]: value }));
};
