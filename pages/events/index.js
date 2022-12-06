import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";

export default function EventsPage({ events }) {
  console.log("number of events", events.length === 6);
  return (
    <Layout>
      <h1> Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt}>
          {evt.name}
        </EventItem>
      ))}
    </Layout>
  );
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events?_sort=date:ASC&populate=*`);
  const events = await res.json();
  console.log("number of events", events.length);
  return {
    props: { events: events.data },
    revalidate: 1,
  };
}
