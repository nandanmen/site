import Head from "next/head";
import clsx from "clsx";
import { faPaperPlane, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { faLinkedinIn, faGithub } from "@fortawesome/free-brands-svg-icons";

import SocialMedia from "../components/SocialMedia";
import ProjectCard, { Frontmatter } from "../components/ProjectCard";
import { Content, getAllProjects, getContentBySlug } from "../lib/projects";
import styles from "../styles/Home.module.scss";

type HomeProps = {
  projects: Content[];
  about: Content;
  description: Content;
};

export default function Home({ projects, about, description }: HomeProps) {
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
            alt="Nanda Syahrasyad profile picture"
          />
          <section className="mb-8 lg:col-start-1 lg:col-span-2">
            <div
              className="text-xl font-semibold mb-4"
              dangerouslySetInnerHTML={{ __html: about.content }}
            />
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: description.content }}
            />
            <ul className="flex mt-4">
              <SocialMedia label="Resume" link="/resume.pdf" icon={faFileAlt} />
              <SocialMedia
                label="Mail to nanda.s@hey.com"
                link="mailto:nanda.s@hey.com"
                icon={faPaperPlane}
              />
              <SocialMedia
                label="GitHub"
                link="https://github.com/narendrasss"
                icon={faGithub}
              />
              <SocialMedia
                label="LinkedIn"
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
        >
          {projects.map((project) => (
            <li
              key={project.slug}
              className={clsx("mb-4", styles.project_list_item)}
            >
              <ProjectCard frontmatter={project.frontmatter as Frontmatter} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const projects = await Promise.all(getAllProjects());
  const about = await getContentBySlug("about.md");
  const description = await getContentBySlug("description.md");

  return {
    props: { about, description, projects },
  };
}
