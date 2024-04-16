import React from "react";
import Link from "next/link";

function NavBar() {
  return (
    <div>
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
    </div>
  );
}

export default NavBar;
