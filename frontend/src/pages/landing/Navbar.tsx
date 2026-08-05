import { Link } from "react-router";

import logo from "../../assets/Logo.svg";
const Navbar = () => {
  return (
    <nav>
      <div className="flex justify-start items-center gap-2 h-20 pt-4 pl-10 mx-12">
        <img className="w-6" src={logo} />
        <span className="font-cormorant text-2xl">DIANA</span>
      </div>
      <div>
        <Link to="/home">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/about">About</Link>
        <Link to="/new">What's new?</Link>
      </div>

      <div>
        <Link to="/register">Get Started</Link>
      </div>
    </nav>
  );
};

export default Navbar;
