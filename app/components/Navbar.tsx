"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="z-20 backdrop-blur-md text-white p-3 fixed w-full bg-red-500">
      <div className="flex gap-8 items-center">
        <div className="font-semibold text-xl cursor-pointer" onClick={() => router.push("/")}>Badminton Fee Calculator</div>

        <div className="flex items-center gap-4">
          <div>
            <Link
              href="/"
              className={`${pathname === "/" ? "font-medium" : ""}`}
            >
              Home
            </Link>
          </div>

          <div>
            <Link
              href="/register"
              className={`${pathname === "/register" ? "font-medium" : ""}`}
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
