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
      <div className="shadow-md w-full fixed top-0 left-0">
        <div className="md:flex items-center justify-between bg-white py-4 md:px-10 px-10  ">
          <div className=" font-bold text-2xl cursor-pointer flex items-center text-black  hover:text-gray-600">
            <span className="block  text-3xl text-black-700 mr-1 ">
              <Link href="/" className="text-black">
                <BsCalendar2Event />
              </Link>
            </span>
            <span className=" block ml-2 mt-2">
              <Link href="/" className="text-black">
                events.io
              </Link>
            </span>
          </div>
          <div
            onClick={() => setOpen(!open)}
            className=" text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            {open ? (
              <AiOutlineClose className=" text-black" />
            ) : (
              <BiMenu className=" text-black" />
            )}
          </div>
          <div className={`${open ? "top-30" : "top-[-490px]"}`}></div>
          <ul
            className={`md:flex md:items-center  text-center mt-4   md:pb-0 pb-3 absolute md:static bg-inherit md:z-auto z-[1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${
              open ? "top-30 " : "top-[-490px]"
            }`}
          >
            <li className="md:ml-10 text-sm max-md:hover:bg-gray-100 max-md:py-2">
              <Link
                href="/events"
                className=" text-black font-semibold  md:hover:text-gray-400"
              >
                Events
              </Link>
            </li>

            {user ? (
              <>
                <li className="md:ml-8 text-sm max-md:hover:bg-gray-100 max-md:py-2">
                  <Link
                    href="/events/add"
                    className=" text-black font-semibold  md:hover:text-gray-400"
                  >
                    Add Event
                  </Link>
                </li>
                <li className="md:ml-8 text-sm max-md:hover:bg-gray-100 max-md:py-2 ">
                  <Link
                    href="/account/dashboard"
                    className=" text-black font-semibold  md:hover:text-gray-400"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="md:ml-8 text-sm max-md:hover:bg-gray-100 max-md:shadow-lg max-md:py-2 ">
                  <Link
                    onClick={() => logout()}
                    className=" font-semibold  md:hover:text-gray-400  text-black "
                    href="#"
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="md:ml-4 text-sm max-md:hover:bg-gray-100 max-md:shadow-lg max-md:py-2  ">
                  <Link
                    href="/account/login"
                    className="ml-5 font-semibold  md:hover:text-gray-400  text-black"
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
      <div className=" h-10 "></div>
    </>
  );
}
