import Link from "next/link";
import Search from "./Search";
import styles from "@/styles/Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Community Events</Link>
      </div>
      <Search />
      <nav>
        <ul>
          <li>
            <Link href="/events">All Events</Link>
          </li>
          <li>
            <Link href="/events/add">Add Event</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
