import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="z-20 backdrop-blur-md text-black p-3 fixed w-full border-b bg-slate-200">
      <div className="flex gap-4 items-center">
        <div className="font-semibold text-xl">Badminton Fee Calculator</div>

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
    </nav>
  );
};

export default Navbar;
