
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="sticky top-3 inline-flex w-fit gap-3 rounded-lg bg-offwhite text-mainbrown font-text items-center justify-center px-5 py-1 font-semibold mt-4">
        <ul className="list-none flex gap-10">
            <li className="hover:line-through"><Link href="/">how it works</Link></li>
            <li className="hover:line-through"><Link href="/upload">try it out</Link></li>
        </ul>
      
    </div>
  );
}
