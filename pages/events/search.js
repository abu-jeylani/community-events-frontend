import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import Link from "next/link";
import { API_URL } from "@/config/index";
import EventItem from "@/components/EventItem";
import Button from "@/components/Button";

export default function SearchPage({ events }) {
  const router = useRouter();
  return (
    <Layout title="Search Results">
      <div>
        <Button path={`/events`} title={`Go Back`} />
      </div>
      <h1 className="mt-4"> Search Results for {router.query.term} </h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt}>
          {evt.name}
        </EventItem>
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const res = await fetch(
    `${API_URL}/api/events?filters[$or][0][slug][$contains]=${term}&filters[$or][1][name][$contains]=${term}& filters[$or][2][host][$contains]=${term}&filters[$or][3][description][$contains]=${term}&populate=*`
  );
  const events = await res.json();

  return {
    props: { events: events.data },
  };
}
