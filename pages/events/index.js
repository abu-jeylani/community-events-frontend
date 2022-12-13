import Layout from "@/components/Layout";
import { API_URL, PER_PAGE } from "@/config/index";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";
import Search from "@/components/Search";

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <div className="mb-10 mt-12 md:px-8 px-20">
        <Search />
      </div>
      <div className="flex flex-col md:flex-row gap-6 m-6">
        {events.length === 0 && <h3>No events to show</h3>}
        {events.map((evt) => (
          <EventItem key={evt.id} evt={evt}>
            {evt.name}
          </EventItem>
        ))}
        <Pagination page={page} total={total} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  //calculate start page
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE;

  //fetch total count
  const totalRes = await fetch(`${API_URL}/api/events`);
  const total = await totalRes.json();
  //fetch events
  const eventRes = await fetch(
    `${API_URL}/api/events?[sort]=date:ASC&pagination[start]=${start}&pagination[limit]=${PER_PAGE}&populate=*`
  );
  const events = await eventRes.json();
  return {
    props: {
      events: events.data,
      page: +page,
      total: total.meta.pagination.total,
    },
  };
}
