import type { Project } from '../lib/projects'

export default function ProjectCard({
  frontmatter,
}: Pick<Project, 'frontmatter'>) {
  return (
    <a
      aria-label={frontmatter.title}
      className="block w-16 h-16 bg-gray-200"
      href={frontmatter.link || frontmatter.github}
      target="_blank"
      rel="noreferrer"
    >
      {frontmatter.title}
    </a>
  )
}
