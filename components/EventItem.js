import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";
import Button from "./Button";

export default function EventItem({ evt }) {
  let imageUrl;

  try {
    imageUrl = evt.attributes.image.data.attributes.formats.medium.url;
  } catch (error) {
    imageUrl = null;
  }

  return (
    <div className="flex max-md:flex-col max-md:place-content-between place-content-between text-xs p-3 shadow-inner shadow-gray-700 rounded-2xl mb-4">
      <div className=" max-md:mx-auto">
        <Image
          src={imageUrl ? imageUrl : "/images/event-default.png"}
          width={170}
          height={100}
          alt={evt.attributes.name}
          className="rounded-2xl shadow-lg shadow-slate-900"
        />
      </div>

      <div className="self-center">
        <h3 className="text-center text-lg mb-4">{evt.attributes.name}</h3>
        <span className="text-center text-xs">
          {new Date(evt.attributes.date).toLocaleDateString("en-US")} at{" "}
          {evt.attributes.time}
        </span>
      </div>

      <div className="self-center max-md:mt-6 max-md:mb-4">
        <Button path={`/events/${evt.attributes.slug}`} title="Details" />
      </div>
    </div>
  );
}
