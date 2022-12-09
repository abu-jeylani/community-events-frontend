import { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import { parseCookies } from "@/helpers/index";

import { API_URL } from "@/config/index";
import styles from "@/styles/Form.module.css";
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
    console.log(user);
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
        console.log("evt", evt);
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
      <Link href="/events">Go Back</Link>
      <h1>Add Event</h1>
      <ToastContainer
        position="top-center"
        theme="colored"
        closeOnClick={true}
      />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="host"
              id="host"
              value={values.host}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={values.date}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={values.time}
              onChange={handleInputChange}
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
          ></textarea>
        </div>
        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const token = parseCookies(req).token;
  console.log("token", token);
  return {
    props: {
      token,
    },
  };
}