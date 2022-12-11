import styles from "@/styles/Showcase.module.css";

export default function Showcase() {
  return (
    // <div className={styles.showcase}>
    //   <h1 className="mb-2 font-mono text-4xl text-gray-100 md:text-6xl">
    //     Welcome&apos;m <br className="block md:hidden" />
    //     <span className="relative">
    //       <span className="h-20 pt-2 overflow-x-hidden whitespace-nowrap text-brand-accent">
    //         Find the latest events going on in your community{" "}
    //         <span className="text-3xl md:text-5xl">👋</span>
    //       </span>
    //       <span className="{`${styles.cursor} absolute -bottom-0 left-0 -top-1 inline-block bg-inherit w-full animate-type will-change`}"></span>
    //     </span>
    //   </h1>
    // </div>
    <div className={styles.showcase}>
      <div className="  font-mono">
        <h1>Welcome</h1>
        <h2>Find the latest events going on in your community</h2>
      </div>
    </div>
  );
}
