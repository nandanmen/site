import clsx from 'clsx'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import Link from 'next/link'
import { FiHome } from 'react-icons/fi'

import Circle from '../../components/Circle'
import Dots from '../../components/Dots'
import SocialMedia from '../../components/SocialMedia'
import Content from '../../components/Content'
import { getProjectSlugs, getProjectBySlug } from '../../lib/projects'
import type { IProject } from '../../lib/projects'
import Head from 'next/head'

export default function ProjectPage({ project }: { project: IProject }) {
  return (
    <Content>
      <Head>
        <title>{project.frontmatter.title}</title>
      </Head>
      <nav className="flex items-center">
        <ul className="text-xl">
          <li>
            <Link href="/">
              <a>
                <FiHome />
              </a>
            </Link>
          </li>
        </ul>
        <Dots className="ml-auto" />
      </nav>
      <header className="relative">
        <Circle className="w-40 h-40 bg-blue-800 -left-16 -top-6" />
        <div
          className={clsx(
            'relative z-10 space-y-4 font-semibold flex flex-col',
            'md:space-y-6'
          )}
        >
          <h1 className={clsx('text-3xl', 'md:text-5xl', 'xl:text-6xl')}>
            {project.frontmatter.title}
          </h1>
          <p>{project.frontmatter.blurb}</p>
        </div>
      </header>
      <ul className="relative z-10 flex justify-between">
        <MetaItem title="Type">
          <p className="text-xs md:text-sm xl:text-base">
            {project.frontmatter.type}
          </p>
        </MetaItem>
        <MetaItem title="Tech Stack">
          <ul className="space-y-1 text-xs md:text-sm xl:text-base">
            {project.frontmatter.tech.map((techName: string) => (
              <li key={techName}>{techName}</li>
            ))}
          </ul>
        </MetaItem>
        <MetaItem title="Code">
          <p>
            <SocialMedia
              label={`${project.frontmatter.title} repository`}
              link={project.frontmatter.github}
              icon={<FaGithub />}
            />
          </p>
        </MetaItem>
        {project.frontmatter.link && (
          <MetaItem title="Demo">
            <p>
              <SocialMedia
                label={`${project.frontmatter.title} demo`}
                link={project.frontmatter.link}
                icon={<FaExternalLinkAlt />}
              />
            </p>
          </MetaItem>
        )}
      </ul>
      <article
        className="space-y-2 text-lg"
        dangerouslySetInnerHTML={{ __html: project.content }}
      />
    </Content>
  )
}

function MetaItem({ title, children }) {
  return (
    <li className="space-y-2 font-mono">
      <h1 className="font-sans font-semibold">{title}</h1>
      {children}
    </li>
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
