import Header from "../components/Header";
import { useState } from "react";
import toast,{ Toaster } from "react-hot-toast";
import { useSignup } from "../hooks/useSignup";


export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  //  if (!email.trim() || !password.trim()) {
  //     toast.error("All fields are required");
  //     return;
  //   }

  //     if (response.ok) {
  //       setEmail("");
  //       setPassword("");
  //       navigate("/login");
  //     } else {
  //       const errText = await response.text();
  //       toast.error(errText);
  //     }
  };

  return (
    <div>
      <Header />
      <Toaster />
      <div className="flex justify-center items-center mt-[90px]">
        <form className="w-[350px] flex flex-col gap-[15px] rounded-[10px]" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-black rounded-[5px] py-[10px] px-[10px] focus:outline-none focus:ring-2 focus:ring-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-black rounded-[5px] py-[10px] px-[10px] focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button
            disabled={isLoading}
            type="submit"
            className="bg-[#437993] text-white py-[10px] px-[10px] rounded-[5px] hover:bg-[#437993] focus:outline-none focus:ring-2 focus:ring-black"
          >
            Sign Up
          </button>
          {error && <div className="text-red-500 text-center">{error}</div>}
          <p className="text-center">
            Already have an account?{" "}
            <a href="/login" className="text-[#437993] hover:underline">
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
