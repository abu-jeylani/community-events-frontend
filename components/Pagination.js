import React from "react";
import Link from "next/link";
import { PER_PAGE } from "@/config/index";

import styles from "@/styles/Pagination.module.css";

export default function Pagination({ page, total }) {
  const lastPage = Math.ceil(total / PER_PAGE);
  return (
    <div className={styles.paginationButtons}>
      {page > 1 && (
        <Link className="btn-secondary" href={`/events?page=${page - 1}`}>
          Prev
        </Link>
      )}
      {page < lastPage && (
        <Link className="btn-secondary" href={`/events?page=${page + 1}`}>
          Next
        </Link>
      )}
    </div>
  );
}
