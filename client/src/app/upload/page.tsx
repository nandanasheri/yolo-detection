import Link from "next/link";
import Image from "next/image";


export default function Upload() {
  return (
    <div className="flex flex-col gap-10 mx-auto max-w-3xl h-[90vh] mt-14 px-4">
      <h1 className="text-head font-bold text-3xl hover:text-offwhite">Upload Your Image</h1>
      <div className="flex flex-col gap-5 justify-center md:justify-start sm:flex-row">
        <div className="bg-offwhite flex flex-col gap-4 px-8 py-3 text-mainbrown font-text rounded-xl">
            <h1 className="text-2xl font-semibold">Instructions</h1>
            <ul className="list-disc text-lg">
                <li>Take a picture of the inside of your refrigerator!</li>
                <li>Make sure your file is of the .png/.jpg format</li>
                <li>File size must be less than 5MB</li>
                <li>Here is a quick sample image</li>
            </ul>
            <Link href="/upload">
              <button className="rounded-lg mt-10 self-center text-xl font-text w-fit px-5 py-1 hover:bg-offwhite hover:border-1 hover:text-mainbrown bg-mainbrown text-offwhite hover:cursor-pointer">upload image</button>
            </Link>
        </div>

        <div>
            <Image className="rounded-xl" src="/sample-fridge.jpg" alt="sample fridge image" width={500} height={500} />
        </div>
      </div>
    </div>
  );
}
