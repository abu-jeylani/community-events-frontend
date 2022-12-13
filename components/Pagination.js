import React from "react";
import Link from "next/link";
import { PER_PAGE } from "@/config/index";

export default function Pagination({ page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE);
  return (
    <div>
      {page > 1 && (
        <Link
          className="text-white shadow-sm shadow-slate-800 text-xs bg-slate-900 hover:bg-slate-700 px-4 py-2 rounded-2xl"
          href={`/events?page=${page - 1}`}
        >
          Prev
        </Link>
      )}
      {page < lastPage && (
        <Link
          className="text-white shadow-sm shadow-slate-800 text-xs bg-slate-900 hover:bg-slate-700 px-4 py-2 rounded-2xl"
          href={`/events?page=${page + 1}`}
        >
          Next
        </Link>
      )}
    </div>
  );
}
