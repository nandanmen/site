import clsx, { ClassValue } from 'clsx'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'

import type { IProject } from '../lib/projects'

type ProjectCardProps = {
  frontmatter: IProject['frontmatter']
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
        <h1 className="mb-4 text-2xl font-semibold xl:text-4xl">
          {frontmatter.title}
        </h1>
        <p className="mb-4 font-semibold">{frontmatter.blurb}</p>
        {frontmatter.path ? (
          <Link href={frontmatter.path}>
            <a className="flex items-center focus:outline-none">
              <span className="mr-1">Read more</span>
              <span>
                <FiArrowRight />
              </span>
            </a>
          </Link>
        ) : (
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
        )}
      </article>
      {children}
    </li>
  )
}

export function ProjectImage({ frontmatter, ...props }) {
  return (
    <img
      src={`/thumbnails/${frontmatter.title.toLowerCase()}.png`}
      alt={frontmatter.title}
      {...props}
    />
  )
}
