import Link from "next/link";
import styles from "@/styles/Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className=" text-xs">Copyright &copy; Community Events 2023</p>
    </footer>
  );
}
