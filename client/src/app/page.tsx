import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 mx-auto max-w-3xl text-center h-[90vh] items-center justify-center ">
      <h1 className="font-head font-bold text-9xl text-mainbrown">Confused on what to cook?</h1>
      <h2 className="text-2xl">Let me take a peek at your fridge!</h2>
      <Link href="/upload">
        <button className="inline-block rounded-lg text-2xl font-text w-fit px-5 py-1 hover:bg-offwhite hover:text-mainbrown bg-mainbrown text-offwhite hover:cursor-pointer">try here!</button>
      </Link>
    </div>
  );
}
