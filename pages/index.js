import Layout from "@/components/Layout";
import { API_URL } from "../config/";
import EventItem from "@/components/EventItem";
import Link from "next/link";

export default function Home({ events }) {
  return (
    <Layout>
      <h1 className=" text-lg font-medium">Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt}>
          {evt.name}
        </EventItem>
      ))}

      {events.length > 0 && (
        <Link href="/events" className="view-events-button">
          See All
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(
    `${API_URL}/api/events?[sort]=date:ASC&pagination[limit]=2&populate=*`
  );
  const events = await res.json();
  return {
    props: { events: events.data },
    revalidate: 1,
  };
}
