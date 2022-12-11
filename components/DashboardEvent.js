import Link from "next/link";
import { FaPencilAlt, FaTimes } from "react-icons/fa";

export default function DashboardEvent({ evt, handleDelete }) {
  return (
    <div className="p-5 justify-between shadow-md text-sm flex items-center border border-solid  my-8  rounded-lg">
      <h4 className="">
        <Link className="text-black" href={`/events/${evt.attributes.slug}`}>
          {evt.attributes.name}
        </Link>
      </h4>
      <div className=" flex">
        {" "}
        <Link className="text-black  " href={`/events/edit/${evt.id}`}>
          <FaPencilAlt className="inline-block h-4 " />
        </Link>
        <Link
          href={`#`}
          className="text-red-500 mx-10"
          onClick={() => handleDelete(evt.id)}
        >
          <FaTimes className="inline-block hover: scale-130" />
        </Link>
      </div>
    </div>
  );
}
