import clsx from 'clsx'

import Circle from '../../components/Circle'
import Dots from '../../components/Dots'
import { getProjectSlugs, getProjectBySlug } from '../../lib/projects'

export default function ProjectPage({ project }) {
  return (
    <main
      className={clsx(
        'p-8 space-y-20 text-white max-w-full',
        'md:p-16 md:space-y-28',
        'lg:px-32 lg:py-24',
        'xl:px-48'
      )}
    >
      <Dots />
      <header className="relative">
        <Circle className="w-40 h-40 bg-blue-800 -left-16 -top-6" />
        <div
          className={clsx(
            'relative z-10 mb-12 space-y-4 font-semibold flex flex-col',
            'md:space-y-6 md:mb-6',
            'xl:items-start xl:text-left xl:space-y-10'
          )}
        >
          <h1 className={clsx('text-3xl', 'md:text-5xl', 'xl:text-6xl')}>
            {project.frontmatter.title}
          </h1>
          <p>{project.frontmatter.blurb}</p>
        </div>
        <ul className="flex">
          <li className="flex-1">
            <h1 className="font-semibold">Type</h1>
            <p className="text-sm">{project.frontmatter.type}</p>
          </li>
          <li className="flex-1">
            <h1 className="font-semibold">Tech Stack</h1>
            <ul className="text-sm">
              {project.frontmatter.tech.map((techName: string) => (
                <li key={techName}>{techName}</li>
              ))}
            </ul>
          </li>
          <li className="flex-1">
            <h1 className="font-semibold">Code</h1>
            <p className="text-sm">
              <a
                href={project.frontmatter.github}
                target="_blank"
                rel="noreferrer"
              >
                Repository
              </a>
            </p>
          </li>
          <li className="flex-1">
            <h1 className="font-semibold">Demo</h1>
            <p className="text-sm">
              <a
                href={project.frontmatter.link}
                target="_blank"
                rel="noreferrer"
              >
                Demo
              </a>
            </p>
          </li>
        </ul>
      </header>
    </main>
  )
}

export async function getStaticProps({ params: { slug } }) {
  return {
    props: {
      project: await getProjectBySlug(`${slug}.md`),
    },
  }
}

export async function getStaticPaths() {
  const slugs = getProjectSlugs()
  return {
    paths: slugs.map((slug) => {
      return {
        params: {
          slug: slug.split('.md')[0],
        },
      }
    }),
    fallback: false,
  }
}
