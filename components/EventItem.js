import Image from "next/image";
import { useRouter } from "next/router";
import Button from "./Button";

export default function EventItem({ evt }) {
  let imageUrl;
  const router = useRouter();

  const navigateToEventDetails = () => {
    router.push(`//events/${evt.attributes.slug}`);
  };

  try {
    imageUrl = evt.attributes.image.data.attributes.formats.medium.url;
  } catch (error) {
    imageUrl = null;
  }

  return (
    <div
      onClick={navigateToEventDetails}
      className="flex flex-col w-11/12 mx-auto max-md:place-content-between place-content-between text-xs p-3 shadow-inner shadow-gray-700 rounded-2xl mb-4 cursor-pointer hover:scale-105  transition-all ease-in-out"
    >
      <div className="">
        <Image
          src={imageUrl ? imageUrl : "/images/event-default.png"}
          width={600}
          height={100}
          alt={evt.attributes.name}
          className="rounded-2xl shadow-lg shadow-slate-900 bg-cover "
        />
      </div>

      <div className="self-center pt-5">
        <h3 className="text-center text-lg mb-4 md:px-4">
          {evt.attributes.name}
        </h3>
        <span className="md:block text-center text-xs md:mx-2">
          {new Date(evt.attributes.date).toLocaleDateString("en-US")} at{" "}
          {evt.attributes.time}
        </span>
      </div>
      <div className="self-center mt-8 mb-8">
        <Button path={`/events/${evt.attributes.slug}`} title="Details" />
      </div>
    </div>
  );
}
