import { Link } from "react-router";
import signup from "../assets/signup.svg";
import logo from "../assets/Logo.svg";
import profile from "../assets/profile.svg";
import mail from "../assets/mail.svg";
import lock from "../assets/lock.svg";
import google from "../assets/google.svg";
import apple from "../assets/apple.svg";
import github from "../assets/github.svg";
import "../index.css";
const Register = () => {
  return (
    <div className="bg-[#07152B] text-[#C8D9E6] font-dm h-screen">
      <div className="flex justify-start items-center gap-2 pt-4 pl-10 mx-12">
        <img className="w-6" src={logo} />
        <span className="font-cormorant text-2xl">DIANA</span>
      </div>
      <div className=" flex justify-evenly items-center gap">
        <div className="w-[40vw] border-2 border-border rounded-2xl drop-shadow-shadow shadow-2xl">
          <img
            className="w-full"
            src={signup}
            alt="Signup Illustration"
            draggable="false"
          />
        </div>
        <div>
          <div className="flex flex-col justify-center items-center my-4">
            <h1 className="font-cormorant text-4xl font-semibold">
              Create Account
            </h1>
            <span className="text-accent font-semi-bold">
              Start your journey with Diana
            </span>
          </div>
          <div className=" border border-border rounded-lg p-5 w-[25vw]">
            {/* User names */}
            <div className=" border-b border-border w-full py-2">
              <div>
                <label htmlFor="names">Full Name</label>
                <div className=" py-1 flex justify-between items-center">
                  <input
                    className="py-1 border border-border w-[90%] rounded-lg pl-2 placeholder:text-border"
                    type="text"
                    placeholder="RedBlue JD"
                  />
                  <img className="size-6" src={profile} draggable="false" />
                </div>
              </div>
            </div>

            {/* Email Input */}
            <div className=" border-b border-border w-full py-2">
              <div>
                <label htmlFor="email">Email</label>
                <div className=" py-1 flex justify-between items-center">
                  <input
                    className="py-1 border border-border w-[90%] rounded-lg pl-2 placeholder:text-border"
                    type="email"
                    placeholder="your@email.com"
                  />
                  <img className="size-6" src={mail} draggable="false" />
                </div>
              </div>
            </div>

            {/* Password Input */}
            <div className="border-b border-border w-full py-3">
              <div>
                <label htmlFor="password">Password</label>
                <br />
                <div className="py-1 flex justify-between items-center">
                  <input
                    type="Password"
                    className="placeholder:tracking-[4px] placeholder:text-3xl py-1 border border-border w-[90%] rounded-lg pl-2"
                    placeholder="········"
                  />
                  <img className="size-6" src={lock} draggable="false" />
                </div>
              </div>
            </div>

            {/* Remember User */}
            <div className="flex justify-between mt-4">
              <div className="flex justify-center items-center gap-1.5">
                <input
                  type="checkbox"
                  className="accent-border h-4 w-4 rounded border-2 border-slate-300 bg-slate-50 cursor-pointer"
                />
                <span>Remember me</span>
              </div>
              <Link className="text-sm text-accent underline" to="#">
                Forgot Password?
              </Link>
            </div>
            <div>
              <Link
                className="flex justify-center bg-button rounded-full mx-[10%] px-2 py-2 my-4"
                to="/"
              >
                Sign in
              </Link>

              {/* Authenticators */}
              <div className="flex gap-2 justify-center items-center my-3">
                <div className="h-px w-20 bg-muted"></div>
                <span className="text-sm">or continue with</span>
                <div className="h-px w-20 bg-muted"></div>
              </div>

              {/* Buttons */}
              <div className="flex justify-between">
                <Link
                  className="px-8 py-3 border border-border rounded-lg bg-button-muted"
                  to="#"
                >
                  <img className="w-6" src={google} draggable="false" />
                </Link>
                <Link
                  className="px-8 py-3 border border-border rounded-lg bg-button-muted"
                  to="#"
                >
                  <img className="w-6" src={apple} draggable="false" />
                </Link>
                <Link
                  className="px-8 py-3 border border-border rounded-lg bg-button-muted"
                  to="#"
                >
                  <img className="w-6" src={github} draggable="false" />
                </Link>
              </div>
            </div>
          </div>
          <span className="flex gap-1 justify-center text-sm my-3">
            Already have an account?{" "}
            <Link className="text-accent underline" to="/login">
              Sign in
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
