import Link from "next/link";
import styles from "@/styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className=" text-xs">copyright &copy; events.io 2023</p>
    </footer>
  );
}
