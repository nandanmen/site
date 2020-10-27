import Head from "next/head";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faFileAlt,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "../styles/Home.module.scss";

export default function Home() {
  return (
    <>
      <Head>
        <title>Nanda Syahrasyad</title>
      </Head>
      <main
        className={clsx(
          "bg-white px-8 py-12 my-0 mx-auto max-w-screen-sm lg:flex lg:max-w-screen-xl",
          styles.main
        )}
      >
        <aside className={clsx("lg:mr-16", styles.about)}>
          <img
            className="w-16 h-16 bg-gray-500 mb-8 rounded-full border-gray-500 border-2 object-cover"
            src="./avatar.jpg"
          />
          <section className="mb-8 lg:col-start-1 lg:col-span-2">
            <div className="text-xl font-semibold mb-4">
              Hey, I'm Nanda! I'm a full-stack developer, currently building
              educational tools and improving workflows @ Tapestry.
            </div>
            <div className={styles.description}>
              I'm currently pursuing a combined Business & CS degree @ UBC, and
              volunteering as a tech lead @ UBC Launch Pad in my spare time.
              <br />
              Checkout some of the things I've worked on!
            </div>
            <ul className="flex mt-4">
              <SocialMedia link="/resume.pdf" icon={faFileAlt} />
              <SocialMedia link="mailto:nanda.s@hey.com" icon={faPaperPlane} />
              <SocialMedia link="https://github.com/narendrasss" icon={faGithub} />
              <SocialMedia
                link="https://linkedin.com/in/narendrass/"
                icon={faLinkedinIn}
              />
            </ul>
          </section>
        </aside>
        <ul
          className={clsx(
            "lg:grid lg:grid-cols-2 lg:grid-rows-2 lg:gap-4",
            styles.project_list
          )}
        ></ul>
      </main>
    </>
  );
}

const PREFIXES = ["https://", "mailto:"];

function SocialMedia({ link, icon }: { link: string; icon: IconDefinition }) {
  const prefix = PREFIXES.find((prefix) => link.startsWith(prefix));
  const displayLink = prefix ? link.slice(prefix.length) : link;
  return (
    <li className="text-lg mr-4">
      <a
        className={clsx("hover:text-blue-600", styles.social_link)}
        data-link={displayLink}
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={icon} />
      </a>
    </li>
  );
}
