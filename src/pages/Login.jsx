import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import toast, { Toaster } from "react-hot-toast";
import { useLogin } from "../hooks/useLogin";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading, error } = useLogin();
  const navigate = useNavigate();

 
  const handleLogin = async (e) => {
  e.preventDefault();

  const success = await login(email, password);

  if (success) {
    navigate("/landing");
  }
};

  return (
    <div>
      <Header />
      <Toaster />
      <div className="flex justify-center items-center mt-[90px]">
        <form
          onSubmit={handleLogin}
          className="w-[350px] flex flex-col gap-[15px] rounded-[10px]"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-black rounded-[5px] py-[10px] px-[10px] focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-black rounded-[5px] py-[10px] px-[10px] focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            disabled={isLoading}
            className="bg-[#437993] text-white py-[10px] px-[10px] rounded-[5px] hover:bg-[#437993] focus:outline-none focus:ring-2 focus:ring-black"
          >
            Login
          </button>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <p className="text-center">
            Don't have an account?{" "}
            <a href="/signup" className="text-[#437993] hover:underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
