import React from "react";
import Link from "next/link";

function NavBar() {
  return (
    <div className="px-20 flex w-full py-5 bg-blue-800 text-white ">
      <div className="w-2/5"></div>
      <div className="w-3/5 justify-between px-auto flex-right pl-20">
        {" "}
        <Link href="/" className="mx-5">
          Home
        </Link>
        <Link href="/item-type" className="mx-5">
          Item Type
        </Link>
        <Link href="/item" className="mx-5">
          Item
        </Link>
        <Link href="/store" className="mx-5">
          Store
        </Link>
        <Link href="/measurement" className="mx-5">
          Measurement
        </Link>
        <Link href="/store-item" className="mx-5">
          Store Item
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
