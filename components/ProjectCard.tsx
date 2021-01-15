import clsx, { ClassValue } from 'clsx'
import { FiArrowRight } from 'react-icons/fi'
import type { Project } from '../lib/projects'

type ProjectCardProps = {
  frontmatter: Project['frontmatter']
  className?: ClassValue
  style?: React.CSSProperties
  children?: React.ReactNode
}

export default function ProjectCard({
  frontmatter,
  className,
  style,
  children,
}: ProjectCardProps) {
  return (
    <li
      className={clsx(
        'block w-full h-full rounded-2xl overflow-hidden relative p-8 shadow-lg',
        'xl:p-12',
        className
      )}
      style={style}
    >
      <article>
        <h1 className="mb-4 text-2xl font-semibold">{frontmatter.title}</h1>
        <p className="mb-4 font-semibold">{frontmatter.blurb}</p>
        <div className="flex">
          {frontmatter.link && (
            <a
              href={frontmatter.link}
              className="flex items-center mr-4 focus:outline-none"
            >
              <span className="mr-1">Demo</span>
              <span>
                <FiArrowRight />
              </span>
            </a>
          )}
          <a
            href={frontmatter.github}
            className="flex items-center focus:outline-none"
          >
            <span className="mr-1">See the code</span>
            <span>
              <FiArrowRight />
            </span>
          </a>
        </div>
      </article>
      {children}
    </li>
  )
}

export function ProjectImage({ frontmatter, ...props }) {
  return (
    <img
      src={`/${frontmatter.title.toLowerCase()}.png`}
      alt={frontmatter.title}
      {...props}
    />
  )
}
