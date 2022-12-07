import { FaPencilAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

import styles from "@/styles/Event.module.css";
import "react-toastify/dist/ReactToastify.css";

export default function EventPage({ evt }) {
  const router = useRouter();

  const deleteEvent = async (e) => {
    console.log("delete");
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/api/events/${evt.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.push("/events");
      }
    }
  };
  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <FaPencilAlt /> Edit Event
          </Link>
          <Link href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes /> Delete Event
          </Link>
        </div>
        <span>
          {new Date(evt.attributes.date).toLocaleDateString("en-US")} at{" "}
          {evt.attributes.time}
        </span>
        <h1>{evt.attributes.name}</h1>
        {evt.attributes.image && (
          <div className={styles.image}>
            {/* <Image
              src={evt.attributes.image.data.attributes.formats.medium.url}
              width={960}
              height={600}
            /> */}
          </div>
        )}
        <h3>Host:</h3>
        <p>{evt.attributes.hosts}</p>
        <h3>Description:</h3>
        <p>{evt.attributes.description}</p>
        <h3>Venue: {evt.attributes.venue}</h3>
        <p>{evt.attributes.address}</p>
        <Link href="/events">{"<"}Go Back</Link>
      </div>
    </Layout>
  );
}

/**
 *
 * option with static rendering
 */

export async function getStaticPaths() {
  const res = await fetch(`${API_URL}/api/events`);
  let events = await res.json();
  events = events.data;

  console.log("slugs", events);

  const paths = events.map((evt) => ({
    params: { slug: evt.attributes.slug },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log("slug is", context);
  const {
    params: { slug },
  } = context;
  const res = await fetch(
    `${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`
  );
  const event = await res.json();
  console.log("event data: ", event.data[0]);
  return {
    props: {
      evt: event.data[0],
      revalidate: 1,
    },
  };
}

/**
 * option 2 with server side rendering
 */

// export async function getServerSideProps(context) {
//   console.log("slug", context);
//   const {
//     query: { slug },
//   } = context;
//   console.log("slug", slug);
//   const eventID = slug;
//   const res = await fetch(`${API_URL}/api/events/${eventID}`);
//   const event = await res.json();
//   console.log("event", event[0]);
//   return {
//     props: {
//       evt: event[0],
//     },
//   };
// }
