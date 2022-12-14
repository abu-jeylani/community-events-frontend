import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState, useContext } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const { login, error } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ email, password });
    console.log(res);
    if (res === "error") {
      toast.error("Invalid username/password");
    }
  };

  return (
    <Layout title="User Login">
      <div className="shadow-sm shadow-slate-600 rounded-lg flex flex-col p-10 items-center">
        <div className="flex my-4 pr-36 ">
          <FaUser className="mt-2 text-sm" />{" "}
          <span className="pl-2">Log In</span>
        </div>
        <ToastContainer position="bottom-center" theme="colored" />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-sm ">
              Email Address
            </label>
            <div className="my-2">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-xl px-2 text-black"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="text-sm">
              Password
            </label>
            <div className="my-2">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-xl pl-4 text-black"
              />
            </div>
          </div>
          <div className="">
            <input
              type="submit"
              value="Login"
              className="text-sm mx-14 bg-slate-800 hover:bg-slate-700 rounded-xl px-8 py-2 mt-4 text-center"
            />
          </div>
        </form>
      </div>
    </Layout>
  );
}
