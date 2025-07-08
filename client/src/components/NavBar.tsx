
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="inline-flex w-fit gap-3 rounded-lg bg-offwhite text-mainbrown font-text items-center justify-center px-5 py-1 font-semibold">
        <ul className="list-none flex gap-10">
            <li><Link href="/">how it works</Link></li>
            <li><Link href="/upload">try it out</Link></li>
        </ul>
      
    </div>
  );
}
