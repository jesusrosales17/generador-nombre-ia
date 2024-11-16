interface Props {
    message: string;
}
export const EmptyMessage = ({message}: Props) => {
  return <p className="text-center text-gray-600 text-sm">{message}</p>;
};
