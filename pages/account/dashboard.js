import { parseCookies } from "@/helpers/index";
import { useRouter } from "next/router";
import AuthContext from "@/context/AuthContext";
import { useContext, useEffect } from "react";
import { API_URL } from "@/config/index";
import DashboardEvent from "@/components/DashboardEvent";
import { ToastContainer, toast } from "react-toastify";

import styles from "@/styles/Dashboard.module.css";

import Layout from "@/components/Layout";

export default function DashboardPage({ events, token }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const deleteEvent = async (id) => {
    if (confirm("Are you sure?")) {
      console.log(`${id}`);
      console.log("token", token);
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push("/events");
      }
    }
  };
  let userEvents;

  if (user == null) {
    userEvents = [];
  } else {
    events.forEach((e) => {
      console.log(e);
    });
    userEvents = events.filter(
      (e) => user.email === e.attributes.user.data.attributes.email
    );
  }

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <ToastContainer />
        <h1 className=" font-semibold">Dashboard</h1>
        {userEvents.map((e) => (
          <DashboardEvent key={e.id} evt={e} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const eventRes = await fetch(`${API_URL}/api/events?populate=*`);
  const data = await eventRes.json();
  const userEvents = data.data;
  const token = parseCookies(req);
  console.log(userEvents);
  return {
    props: {
      events: userEvents,
      token: token,
    },
  };
}
