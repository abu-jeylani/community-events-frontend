import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import AuthContext from "@/context/AuthContext";
import Link from "next/link";
import Search from "./Search";
import styles from "@/styles/Header.module.css";
import { useContext } from "react";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  const navMenuClick = () => {
    let x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">Events.IO</Link>
      </div>

      <Search />
      <nav>
        <ul>
          <li>
            <Link href="/events">All Events</Link>
          </li>
          {user ? (
            <>
              <li>
                <Link href="/events/add">Add Event</Link>
              </li>
              <li>
                <Link href="/account/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={() => logout()} className="btn-secondary">
                  Sign Out
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/account/login" className="btn-secondary btn-icon">
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
