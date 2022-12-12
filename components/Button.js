import React from "react";
import Link from "next/link";

export default function Button({ title, path }) {
  return (
    <button>
      <Link
        className="text-white shadow-sm shadow-slate-800 text-xs bg-slate-800 hover:bg-slate-700 px-4 py-1.5 rounded-2xl"
        href={`${path}`}
      >
        {title}
      </Link>
    </button>
  );
}
