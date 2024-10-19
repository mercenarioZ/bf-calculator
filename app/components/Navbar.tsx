const Navbar = ({ title }: { title: string }) => {
  return (
    <nav className="z-20 backdrop-blur-md text-black font-bold text-xl p-3 fixed w-full border-b bg-slate-200">
      {title}
    </nav>
  );
};

export default Navbar;
