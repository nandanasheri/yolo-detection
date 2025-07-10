'use client'
import Image from "next/image";
import { useState } from 'react';


export default function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]
      if (file) {
        setFile(file)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!file) {
      setError("No files chosen")
      return
    }

    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.text();
      if (response.ok) {
        console.log(data)
        setError('');
      } else {
        setError(data || 'An error occurred during upload.');
      }
    } catch (err) {
      console.log(err)
      setError('An unexpected error occurred.');
    }
  }

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

            <form onSubmit={handleSubmit}>
              <input type="file" accept="image/*" onChange={handleImageChange} className="px-5 py-1 border border-mainbrown rounded-lg hover:bg-mainbrown hover:text-offwhite" />
              <button type="submit" className="rounded-lg mt-10 self-center text-xl font-text w-fit px-5 py-1 hover:bg-offwhite hover:border-1 hover:text-mainbrown bg-mainbrown text-offwhite hover:cursor-pointer">upload image</button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {uploadedImage && <img src={uploadedImage} alt="Uploaded" width="200" />}
            </form>
            
        </div>

        <div className="flex content-center items-center overflow-hidden">
            <Image className="rounded-xl min-w-full min-h-full" src="/sample-fridge.jpg" alt="sample fridge image" width={500} height={600} />
        </div>
      </div>
    </div>
  );
}
