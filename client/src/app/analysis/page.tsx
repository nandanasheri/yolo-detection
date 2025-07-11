"use client"
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Analysis() {
  const [image, setImage] = useState("")
  const [objects, setObjects] = useState<string[]>([])
  useEffect(() => {
    const storedImage = sessionStorage.getItem("image_data");
    let objects_result = sessionStorage.getItem("objects");
    console.log(objects_result)
    console.log(objects_result)
    if (storedImage) {
      setImage(storedImage);
    }
    if (objects_result) {
      const list_of_objects = objects_result.split(",")
      setObjects(list_of_objects)
    }
  }, []);

  return (
    <div className="flex flex-col gap-10 mx-auto max-w-3xl h-[90vh] mt-14 px-4">
      <h1 className="text-head font-bold text-3xl hover:text-offwhite">Fridge Peek Analysis</h1>
      <div className="flex flex-col gap-5 justify-center md:justify-start sm:flex-row">
        <div>
            <Image className="rounded-xl" src={`data:image/jpeg;base64,${image}`} alt="ridge image" width={500} height={500} />
        </div>

        <div className="bg-mainbrown flex flex-col gap-4 px-8 py-3 text-offwhite font-text rounded-xl">
            <h1 className="text-2xl font-semibold">Objects Detected:</h1>
            <ul className="list-disc text-lg">
              {objects.map((item) => {
                return (
                  <li key={item}>{item}</li>
                )
              })}
            </ul>
            <Link href="/upload">
              <button className="rounded-lg mt-10 self-center text-xl font-text w-fit px-5 py-1 border-offwhite border-2 hover:bg-offwhite hover:text-mainbrown text-offwhite hover:cursor-pointer">find recipes</button>
            </Link>
        </div>

      </div>
    </div>
  );
}
