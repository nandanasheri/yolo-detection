"use client"

import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';


export default function Analysis() {
  const [image, setImage] = useState("")
  const [objects, setObjects] = useState<string[]>([])

  const router = useRouter()

  // get detected objects and image on initial render
  useEffect(() => {
    const storedImage = sessionStorage.getItem("image_data");
    let objects_result = sessionStorage.getItem("objects");
    
    if (storedImage) {
      setImage(storedImage);
    }
    if (objects_result) {
      const list_of_objects = objects_result.split(",")
      setObjects(list_of_objects)
    }
  }, []);

  const findRecipes = async () => {
    try {
      const url = new URL("http://127.0.0.1:5000/recipes");

      const params = new URLSearchParams();
      objects.forEach(item => params.append("i", item));
      url.search = params.toString();
      
      const response = await fetch(url.toString(), {
        method : 'GET'
      })
      const data = await response.json()
      if (response.ok) {
        sessionStorage.setItem("recipes", data['recipes'])
        console.log(data)
      }
      router.push("/recipes")
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="flex flex-col gap-10 mx-auto max-w-7xl h-[90vh] mt-14 px-4">
      <h1 className="text-head font-bold text-3xl hover:text-offwhite">Fridge Peek Analysis</h1>
      <div className="flex flex-col gap-5 justify-center md:justify-between md:flex-row">
        <div>
            <Image className="rounded-xl" src={`data:image/jpeg;base64,${image}`} alt="fridge image" width={600} height={700} />
        </div>

        <div className="bg-mainbrown md:w-1/3 flex flex-col gap-4 px-8 py-3 text-offwhite font-text rounded-xl">
            <h1 className="text-2xl font-semibold">Objects Detected:</h1>
            <ul className="list-disc text-lg">
              {objects.map((item) => {
                return (
                  <li key={item}>{item}</li>
                )
              })}
            </ul>
            
            <button onClick={findRecipes} className="rounded-lg mt-10 self-center text-xl font-text w-fit px-5 py-1 border-offwhite border-2 hover:bg-offwhite hover:text-mainbrown text-offwhite hover:cursor-pointer">find recipes</button>
           
        </div>

      </div>
    </div>
  );
}
