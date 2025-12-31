"use client";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const Navbar = () => {
  const currentPath = usePathname();

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
            // className={`${
            //   item.link === currentPath ? "text-zinc-800" : "text-zinc-400 "
            // } hover:text-zinc-800 transition-colors`}
            className={classNames({
              "text-zinc-900": item.link === currentPath,
              "text-zinc-500": item.link !== currentPath,
              "hover:text-zinc-800 transition-colors": true,
            })}
          >
            {item.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
