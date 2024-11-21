import { GenerateNamesForm } from "@/features/generatedNames";
import { OptionsMenu } from "@/features/navigation/";

export const metadata = {
  title: "Generador de nombres para empresas y productos",
  description: "Generador de nombres para empresas y productos",
};
export default function HomePage() {
  return (
    <div className="relative h-screen w-full overflow-x-hidden bg-gray-50">
      {/* Bola 1 con gradiente */}
      <div className="fixed -left-0 -top-0 lg:-left-32 lg:-top-32  h-[40vh] w-[40vw] lg:h-[500px] lg:w-[500px] rounded-full bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-100 opacity-60 blur-3xl"></div>

      {/* Bola 2 con gradiente */}
      <div className="fixed -bottom-0 -right-1 lg:-bottom-32 lg:-right-32 h-[40vh] w-[40vw] lg:h-[600px] lg:w-[600px] rounded-full bg-gradient-to-tl from-purple-400 via-pink-200 lg:via-pink-100 to-red-200 opacity-60 blur-3xl"></div>

      <div className="p-2 relative z-10">
        <h1 className="text-center mt-3 mb-4 text-4xl lg:text-6xl font-extrabold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600 ">
          Generador de Nombres IA
        </h1>
        <p className="text-center text-gray-600  mt-2 mx-auto">
          Crea nombres únicos y creativos para tu empresa o producto con el
          poder de la inteligencia artificial
        </p>

        <div className=" w-full flex flex-col md:flex-row justify-between items-start  lg:w-11/12 mx-auto mt-10 gap-4">
          <GenerateNamesForm />
          <div className="backdrop-blur-sm bg-white/20 rounded-lg shadow-lg border p-4 h-100 w-full">
            <OptionsMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
