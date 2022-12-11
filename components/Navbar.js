import { useState } from "react";
import { BsCalendar2Event } from "react-icons/bs";
import { BiMenu, BiLogIn } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

import Link from "next/link";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  let [open, setOpen] = useState(false);
  return (
    <>
      <div className="w-full fixed top-0 left-0 z-10">
        <div className="md:flex items-center justify-between bg-gradient-to-l from-black to-gray-900 py-4 md:px-10 px-10 shadow-sm shadow-slate-800">
          <div className=" font-bold text-2xl cursor-pointer flex items-center  hover:text-gray-600">
            <span className="block  text-3xl text-black-700 mr-1 ">
              <Link href="/" className="text-white">
                <BsCalendar2Event />
              </Link>
            </span>
            <span className=" block ml-2 mt-2">
              <Link href="/" className="text-white">
                events.io
              </Link>
            </span>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className=" text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            {open ? (
              <AiOutlineClose className=" text-white" />
            ) : (
              <BiMenu className=" text-white" />
            )}
          </div>
          <ul
            className={`md:flex md:items-center  text-center mt-4   md:pb-0  absolute md:static max-md:bg-gradient-to-l from-black to-gray-900 max-md:shadow-sm max-md:shadow-slate-800 z-10 left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-30 " : "top-[-490px]"
            }`}
          >
            <li className="md:ml-10 text-sm  max-md:py-2">
              <Link
                href="/events"
                className=" text-white font-semibold  hover:text-gray-400"
              >
                Events
              </Link>
            </li>

            {user ? (
              <>
                <li className="md:ml-8 text-sm  max-md:py-2">
                  <Link
                    href="/events/add"
                    className=" text-white font-semibold  hover:text-gray-400"
                  >
                    Add Event
                  </Link>
                </li>
                <li className="md:ml-8 text-sm  max-md:py-2 ">
                  <Link
                    href="/account/dashboard"
                    className=" text-white font-semibold  hover:text-gray-400"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="md:ml-8 text-sm  max-md:shadow-lg max-md:py-2 ">
                  <Link
                    onClick={() => logout()}
                    className=" font-semibold hover:text-gray-400  text-white "
                    href="#"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="md:ml-4 text-sm max-md:shadow-lg max-md:py-2  ">
                  <Link
                    href="/account/login"
                    className="ml-5 font-semibold  hover:text-gray-400  text-white"
                  >
                    Admin Login
                  </Link>
                </li>
                <span></span>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="bg-gradient-to-l  h-10 "></div>
    </>
  );
}
