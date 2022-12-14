import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import { parseCookies } from "@/helpers/index";

import { API_URL } from "@/config/index";
import "react-toastify/dist/ReactToastify.css";

export default function AddEventPage({ token }) {
  const { user } = useContext(AuthContext);
  const [values, setValues] = useState({
    name: "",
    description: "",
    venue: "",
    address: "",
    host: "",
    date: "",
    time: "",
    user: "",
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    values.user = user;

    //validation
    const hasEmptyFields = Object.values(values).some(
      (element) => element === ""
    );
    if (hasEmptyFields) {
      toast.error("Please fill in all fields");
    } else {
      const res = await fetch(`${API_URL}/api/events`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: values }),
      });

      if (!res.ok) {
        toast.error("Something went wrong");
      } else {
        const evt = await res.json();
        router.push(`/events/add/image-upload/${evt.data.id}`);
      }
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  return (
    <Layout title="Add New Event">
      <Link
        href="/events"
        className="text-white shadow-sm shadow-slate-800 text-xs bg-slate-900 hover:bg-slate-700 px-4 py-2 rounded-2xl"
      >
        Go Back
      </Link>
      <h1 className="mt-4">Add Event</h1>
      <ToastContainer
        position="top-center"
        theme="colored"
        closeOnClick={true}
      />
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-8 mb-5">
          <div>
            <label htmlFor="name" className="block">
              Event Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
              className=" w-full p-1 h-10 shadow appearance-none border border-solid text-black rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="host" className="block">
              Host
            </label>
            <input
              type="text"
              name="host"
              id="host"
              value={values.host}
              onChange={handleInputChange}
              className=" w-full p-1 h-10 shadow appearance-none border border-solid text-black rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="venue" className="block ">
              Venue
            </label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
              className="w-full p-1 h-10 shadow appearance-none border border-solid text-black rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="address" className="block">
              Address
            </label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
              className="w-full p-1 h-10 shadow appearance-none border border-solid text-black rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="date" className="block">
              Date
            </label>
            <input
              type="date"
              name="date"
              id="date"
              value={values.date}
              onChange={handleInputChange}
              className="w-full p-1 h-10 shadow appearance-none border border-solid text-black rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="time" className="block">
              Time
            </label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
              className="w-full p-1 h-10 shadow appearance-none border border-solid text-black rounded-lg"
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
            className="shadow appearance-none border border-solid text-black rounded-lg w-full h-36"
          ></textarea>
        </div>
        <input
          type="submit"
          value={"Add Event"}
          className="block w-full my-4 text-white shadow-sm shadow-slate-700 text-xs hover:bg-slate-700 px-4 py-4 rounded-2xl"
        />
      </form>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const token = parseCookies(req).token;
  return {
    props: {
      token,
    },
  };
}
