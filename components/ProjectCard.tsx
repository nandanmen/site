import clsx, { ClassValue } from 'clsx'
import Link from 'next/link'
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
    <section
      className={clsx(
        'block w-full rounded-2xl overflow-hidden relative p-8',
        className
      )}
      style={style}
    >
      <article>
        <h1 className="mb-4 text-2xl font-semibold">{frontmatter.title}</h1>
        <p className="mb-4 font-semibold">{frontmatter.blurb}</p>
        <Link href={frontmatter.path}>
          <a className="flex items-center focus:outline-none">
            <span className="mr-1">Read more</span>
            <span>
              <FiArrowRight />
            </span>
          </a>
        </Link>
      </article>
      {children}
    </section>
  )
}

export function ProjectImage({ frontmatter, ...props }) {
  return (
    <img
      src={`/projects/${frontmatter.title}.png`}
      alt={frontmatter.title}
      {...props}
    />
  )
}
