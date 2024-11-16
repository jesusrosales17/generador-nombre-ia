import { GenerateNamesForm } from "@/features/generatedNames";
import { OptionsMenu } from "@/features/navigation/";

export const metadata = {
  title: "Generador de nombres para empresas y productos",
  description: "Generador de nombres para empresas y productos",
};
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-pink-100 to-blue-100 dark:from-purple-900 dark:via-blue-900 dark:to-blue-900 p-4 md:p-8">
      <h1 className="text-center mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400">
        Generador de Nombres IA
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-300 mt-2 mx-auto">
        Crea nombres únicos y creativos para tu empresa o producto con el poder
        de la inteligencia artificial
      </p>

      <div className=" w-full flex flex-col md:flex-row justify-between items-start  lg:w-11/12 mx-auto mt-10 gap-4">
        <GenerateNamesForm />
        <div className="backdrop-blur-sm bg-white/20 rounded-lg shadow-lg border p-4 h-100 w-full">
         <OptionsMenu />
        </div>
      </div>
    </div>
  );
}
