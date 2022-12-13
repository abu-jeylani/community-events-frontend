import Layout from "@/components/Layout";
import { API_URL } from "../config/";
import EventItem from "@/components/EventItem";
import Button from "@/components/Button";

export default function Home({ events }) {
  return (
    <Layout>
      <h1 className="md:text-lg text-md text-white font-extrabold md:px-6 ">
        Upcoming Events
      </h1>

      <div className="flex flex-col md:flex-row gap-6 m-6">
        {events.length === 0 && <h3>No events to show</h3>}
        {events.map((evt) => (
          <EventItem key={evt.id} evt={evt}>
            {evt.name}
          </EventItem>
        ))}
      </div>

      {events.length > 0 && (
        <div className="">
          <Button path="/events" title="See All" />
        </div>
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
