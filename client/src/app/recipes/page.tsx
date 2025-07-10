import Link from "next/link";
import Image from "next/image";


export default function Recipes() {
  return (
    <div className="flex flex-col gap-10 mx-auto max-w-3xl h-[90vh] mt-14 px-4">
      <h1 className="text-head font-bold text-3xl hover:text-offwhite">Recommended Recipes</h1>
      <div className="flex flex-col gap-5 justify-center md:justify-start sm:flex-row">
        <div>
            <Image className="rounded-xl" src="/sample-fridge.jpg" alt="sample fridge image" width={500} height={500} />
        </div>

      </div>
    </div>
  );
}
