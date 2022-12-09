import { parseCookies } from "@/helpers/index";
import { useRouter } from "next/router";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";
import { API_URL } from "@/config/index";
import DashboardEvent from "@/components/DashboardEvent";

import styles from "@/styles/Dashboard.module.css";

import Layout from "@/components/Layout";

export default function DashboardPage({ events, token }) {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const deleteEvent = async (id) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/api/events/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
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
    userEvents = events.filter(
      (e) => user.email === e.attributes.user.data.attributes.email
    );
  }

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>
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

  return {
    props: {
      events: userEvents,
      token: token,
    },
  };
}
