import Head from 'next/head'
import clsx from 'clsx'
import { FaPaperPlane, FaFileAlt, FaLinkedinIn, FaGithub } from 'react-icons/fa'

import SocialMedia from '../components/SocialMedia'
import ProjectCard from '../components/ProjectCard'
import { getContentBySlug, getProjectBySlug } from '../lib/projects'
import type { Content, Project } from '../lib/projects'
import styles from '../styles/Home.module.scss'

type HomeProps = {
  projects: Record<string, Project>
  description: Content
}

export default function Home({ projects, description }: HomeProps) {
  return (
    <>
      <Head>
        <title>Nanda Syahrasyad</title>
        <meta
          name="description"
          content="Nanda Syahrasyad is a full-stack software developer specializing in building beautiful web applications and streamlining developer workflows."
        />
      </Head>
      <main className="max-w-5xl p-8 mx-auto">
        <header className={clsx('lg:mr-16', styles.about)}>
          <img
            className="object-cover w-16 h-16 mx-auto mb-8 bg-gray-400 border-2 border-gray-400 rounded-full"
            src="./avatar.jpg"
            alt="Headshot of Nanda Syahrasyad"
          />
          <div className="mb-4 text-2xl font-semibold">
            <h1 className="mb-4 text-center">
              Hey, I'm Nanda{' '}
              <span role="img" aria-label="hand wave">
                👋
              </span>
            </h1>
            <p>
              I'm a full-stack developer and student, currently building
              educational tools and improving workflows @{' '}
              <a href="https://tapestry-tool.com/">Tapestry</a>.
            </p>
          </div>
        </header>
        <section className="lg:col-start-1 lg:col-span-2">
          <div
            className={styles.description}
            dangerouslySetInnerHTML={{ __html: description.content }}
          />
          <ul className="flex justify-center mt-4 mb-12">
            <SocialMedia
              label="Resume"
              link="/resume.pdf"
              icon={<FaFileAlt />}
            />
            <SocialMedia
              label="Mail to nanda.s@hey.com"
              link="mailto:nanda.s@hey.com"
              icon={<FaPaperPlane />}
            />
            <SocialMedia
              label="GitHub"
              link="https://github.com/narendrasss"
              icon={<FaGithub />}
            />
            <SocialMedia
              label="LinkedIn"
              link="https://linkedin.com/in/narendrass/"
              icon={<FaLinkedinIn />}
            />
          </ul>
        </section>
        <ul className={clsx('mb-12', styles.project_list)}>
          <li className={clsx('mb-4', styles.project_list_item)}>
            <ProjectCard
              frontmatter={projects.playground.frontmatter}
              className={clsx(
                'bg-gray-700 text-white focus-within:ring-8 focus-within:ring-gray-400',
                styles.playground
              )}
              imageDimensions={{ width: 900 }}
            />
          </li>
          <li className={clsx('mb-4', styles.project_list_item)}>
            <ProjectCard
              frontmatter={projects.keepFresh.frontmatter}
              className="text-white bg-green-400 focus-within:ring-8 focus-within:ring-green-300"
              imageDimensions={{ width: 400 }}
            />
          </li>
          <li className={clsx('mb-4', styles.project_list_item)}>
            <ProjectCard
              frontmatter={projects.visualizer.frontmatter}
              className="pb-2"
              style={{ background: '#edd3c2' }}
              imageDimensions={{ width: 600 }}
            />
          </li>
          <li className={clsx('mb-4', styles.project_list_item)}>
            <ProjectCard
              frontmatter={projects.evital.frontmatter}
              className="h-56 bg-red-400"
            />
          </li>
        </ul>
        <section className="mb-12">
          <h1 className="mb-4 text-2xl font-semibold">
            Let's get to know each other.
          </h1>
          <p className="mb-4">
            I'm currently looking for full-time SWE opportunities in Canada. If
            you know any, or if you just want to say hi, feel free to reach out!
          </p>
          <a className="font-semibold" href="mailto:nanda.s@hey.com">
            nanda.s@hey.com
          </a>
        </section>
        <footer className="text-gray-500">
          <p className="mb-2 font-mono text-sm text-center">
            Nanda Syahrasyad 2021
          </p>
          <ul className="flex justify-center">
            <SocialMedia
              label="GitHub"
              link="https://github.com/narendrasss"
              icon={<FaGithub />}
            />
            <SocialMedia
              label="LinkedIn"
              link="https://linkedin.com/in/narendrass/"
              icon={<FaLinkedinIn />}
            />
          </ul>
        </footer>
      </main>
    </>
  )
}

export async function getStaticProps() {
  const keepFresh = await getProjectBySlug('keepfresh.md')
  const visualizer = await getProjectBySlug('visualizer.md')
  const playground = await getProjectBySlug('playground.md')
  const evital = await getProjectBySlug('evital.md')
  const description = await getContentBySlug('description.md')

  return {
    props: {
      description,
      projects: { keepFresh, visualizer, playground, evital },
    },
  }
}
