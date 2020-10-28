import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExternalLinkAlt,
  faHeartbeat,
  faVectorSquare,
  faSeedling,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import styles from "./ProjectCard.module.scss";

import Tapestry from "./Tapestry";

export type Frontmatter = {
  github: string;
  link: string | null;
  tech: string[];
  title: string;
};

const components: Record<string, IconDefinition> = {
  eVital: faHeartbeat,
  Visualizer: faVectorSquare,
  KeepFresh: faSeedling,
};

export default function ProjectCard({ frontmatter }: { frontmatter: Frontmatter }) {
  return (
    <a
      className={clsx(
        "p-6 rounded-md bg-gray-200 flex flex-col-reverse justify-between relative hover:bg-blue-600 hover:text-white",
        styles.project
      )}
      href={frontmatter.link || frontmatter.github}
      target="_blank"
      rel="noreferrer"
    >
      <header>
        <h1 className="text-lg font-semibold">{frontmatter.title}</h1>
        <p className="text-xs text-gray-600">
          {frontmatter.tech.map((name, index) => (
            <span key={name}>
              {name}
              {index === frontmatter.tech.length - 1 ? "" : " / "}
            </span>
          ))}
        </p>
      </header>
      {frontmatter.title === "Tapestry" ? (
        <Tapestry />
      ) : (
        <div className="text-teal-400 h-full flex items-center justify-center">
          <FontAwesomeIcon icon={components[frontmatter.title]} size="8x" />
        </div>
      )}
      <button
        className={clsx(
          "w-10 h-10 bg-gray-100 absolute rounded-full text-gray-600",
          styles.project_button,
          { "text-2xl": !frontmatter.link }
        )}
      >
        <FontAwesomeIcon icon={frontmatter.link ? faExternalLinkAlt : faGithub} />
      </button>
    </a>
  );
}
