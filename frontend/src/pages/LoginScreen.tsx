import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { loginUser } from "../services/authService";
import login from "../assets/Login.svg";
import logo from "../assets/Logo.svg";
import mail from "../assets/mail.svg";
import lock from "../assets/lock.svg";
import google from "../assets/google.svg";
import apple from "../assets/apple.svg";
import github from "../assets/github.svg";
import "../index.css";
const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Please enter your email and password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const token = await loginUser(email, password);

      localStorage.setItem("token", token);

      navigate("/");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-background text-text font-dm h-screen">
      <div className="flex justify-start items-center gap-2 h-20 pt-4 pl-10 mx-12">
        <img className="w-6" src={logo} />
        <span className="font-cormorant text-2xl">DIANA</span>
      </div>
      <div className=" flex justify-evenly items-center gap">
        <div className="w-[40vw] h-[70vh] border-2 border-border rounded-2xl drop-shadow-shadow shadow-2xl">
          <img
            className="w-full"
            src={login}
            alt="Login Illustration"
            draggable="false"
          />
        </div>
        <div>
          <div className="flex flex-col justify-center items-center my-4">
            <h1 className="font-cormorant text-4xl font-semibold">
              Welcome Back
            </h1>
            <span className="text-accent font-semi-bold">
              Sign in to continue to your dashboard
            </span>
          </div>
          <form
            onSubmit={handleLogin}
            className=" border border-border rounded-lg p-6 w-[25vw]"
          >
            {/* Email Input */}
            <div className=" border-b border-border w-full py-2">
              <div>
                <label htmlFor="email">Email</label>
                <div className=" py-1 flex justify-between items-center">
                  <input
                    id="email"
                    className="py-2 border border-border w-[90%] rounded-lg pl-2 placeholder:text-border"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
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
                    id="password"
                    type="Password"
                    className="placeholder:tracking-[4px] placeholder:text-3xl placeholder:text-border py-2 border border-border w-[90%] rounded-lg pl-2"
                    placeholder="········"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
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
            <div className="">
              {error && (
                <p className="text-red-500 text-sm text-center mt-3">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="flex justify-center w-[80%] bg-button rounded-full mx-[10%] px-2 py-2 my-4 disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

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
          </form>
          <span className="flex gap-1 justify-center text-sm my-4">
            New here?{" "}
            <Link className="text-accent underline" to="/register">
              Create Account
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
