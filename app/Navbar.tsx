import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
  const links = [
    { label: "Dashboard", link: "/" },
    { label: "Issues", link: "/issues" },
  ];
  return (
    <nav className="flex space-x-5 mb-5 px-5 border-b border-zinc-200 h-14 items-center">
      <Link href={"/"} className="text-black">
        <AiFillBug size={24} />
      </Link>
      <ul className="flex space-x-5 font-medium">
        {links.map((item) => (
          <Link
            key={item.link}
            href={item.link}
            className="text-zinc-500 hover:text-zinc-600 transition-colors"
          >
            {item.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
