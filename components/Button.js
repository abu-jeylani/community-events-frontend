import React from "react";
import Link from "next/link";

export default function Button({ title, path }) {
  return (
    <Link
      className="text-white shadow-sm shadow-slate-800 text-xs bg-slate-900 hover:bg-slate-700 px-6 py-3 rounded-2xl "
      href={`${path}`}
    >
      {title}
    </Link>
  );
}
