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
    <span className={` w-100 h-100 cursor-pointer mb-3  `}>
      <form onSubmit={handleSubmit} className=" flex ">
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search Events"
          className=" font-mono text-xs text-center px-5 border border-solid border-black rounded-md transition ease-in-out"
        />
        <i>
          <BsSearch
            className=" text-xl  ml-3 pt-1 hover:scale-125"
            onClick={handleSubmit}
          />
        </i>
      </form>
    </span>
  );
}
