"use client";

interface Props {
    error: string
}

export const FormErrorMessage = ({error}: Props) => {

  if(!error) return null;

  return (
    <div className="bg-red-100 border mb-4 text-center border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <span className="block sm:inline">{error}</span>
    </div>
  )
}
