import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/EventItem.module.css";

export default function EventItem({ evt }) {
  let imageUrl;

  try {
    imageUrl = evt.attributes.image.data.attributes.formats.medium.url;
  } catch (error) {
    imageUrl = null;
  }
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={imageUrl ? imageUrl : "/images/event-default.png"}
          width={170}
          height={100}
          alt={evt.attributes.name}
        />
      </div>

      <div className={styles.info}>
        <span>
          {new Date(evt.attributes.date).toLocaleDateString("en-US")} at{" "}
          {evt.attributes.time}
        </span>
        <h3>{evt.attributes.name}</h3>
      </div>

      <div className={styles.link}>
        <Link className="btn-secondary" href={`/events/${evt.attributes.slug}`}>
          Details
        </Link>
      </div>
    </div>
  );
}
