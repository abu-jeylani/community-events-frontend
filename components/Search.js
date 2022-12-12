import { useState } from "react";
import { useRouter } from "next/router";
import { BsSearch } from "react-icons/bs";

export default function Search({ classApplication }) {
  const [term, setTerm] = useState("");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/events/search?term=${term}`);
    setTerm("");
  };

  return (
    <div className=" w-100 h-100 cursor-pointer mb-4">
      <form onSubmit={handleSubmit} className=" flex ">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search Events"
          className="bg-slate-900 pl-0 font-mono  hover:scale-110 text-md text-center px-5  rounded-md transition ease-in-out shadow-sm shadow-slate-600"
        />
        <i>
          <BsSearch
            className="text-2xl  ml-3 pt-1 hover:scale-125"
            onClick={handleSubmit}
          />
        </i>
      </form>
    </div>
  );
}
