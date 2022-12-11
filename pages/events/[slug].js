import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Button from "@/components/Button";

import "react-toastify/dist/ReactToastify.css";

export default function EventPage({ evt }) {
  const router = useRouter();

  return (
    <Layout>
      <div className=" text-center">
        <div className=" my-3">
          {new Date(evt.attributes.date).toLocaleDateString("en-US")} at{" "}
          {evt.attributes.time}
        </div>
        <h1 className="text-3xl">{evt.attributes.name}</h1>
        <div className=" my-3">
          <h3 className=" text-2xl">Host:</h3>
          <p>{evt.attributes.host}</p>
        </div>
        <div className=" my-3">
          <h3 className=" text-2xl">Description:</h3>
          <p>{evt.attributes.description}</p>
        </div>
        <div className=" my-5">
          <h3 className=" text-2xl">Venue: </h3>
          <p>{evt.attributes.venue}</p>
        </div>
        <div className="my-5">
          <h3 className=" text-2xl">Address:</h3>
          <p>{evt.attributes.address}</p>
        </div>

        <span
          onClick={() => {
            router.back();
          }}
        >
          <Button path="#" title="Go back" />
        </span>

        <span
          onClick={() => {
            router.back();
          }}
        >
          <Button path="#" title="RSVP" />
        </span>
      </div>
    </Layout>
  );
}

/**
 *
 * option with static rendering
 */

// export async function getStaticPaths() {
//   const res = await fetch(`${API_URL}/api/events`);
//   let events = await res.json();
//   events = events.data;

//   const paths = events.map((evt) => ({
//     params: { slug: evt.attributes.slug },
//   }));
//   return {
//     paths,
//     fallback: false,
//   };
// }

// export async function getStaticProps(context) {
//   const {
//     params: { slug },
//   } = context;
//   const res = await fetch(
//     `${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`
//   );
//   const event = await res.json();
//   return {
//     props: {
//       evt: event.data[0],
//       revalidate: 1,
//     },
//   };
// }

/**
 * option 2 with server side rendering
 */

export async function getServerSideProps(context) {
  console.log("slug", context);
  const {
    query: { slug },
  } = context;
  console.log("slug", slug);
  const res = await fetch(
    `${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`
  );
  const event = await res.json();
  console.log("event", event.data[0]);
  return {
    props: {
      evt: event.data[0],
    },
  };
}
