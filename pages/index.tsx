import Head from 'next/head'
import clsx from 'clsx'
import {
  FaPaperPlane,
  FaFileAlt,
  FaLinkedinIn,
  FaGithub,
  FaTwitter,
} from 'react-icons/fa'
import { HTMLMotionProps, motion } from 'framer-motion'

import SocialMedia from '../components/SocialMedia'
import ProjectCard, { ProjectImage } from '../components/ProjectCard'
import Dots from '../components/Dots'
import Circle from '../components/Circle'
import Content from '../components/Content'
import Wave from '../components/Wave'
import { getContentBySlug, getProjectBySlug } from '../lib/projects'
import type { IContent, IProject } from '../lib/projects'
import styles from '../styles/Home.module.scss'

import { meta as playgroundMeta } from './playground.mdx'

type HomeProps = {
  projects: Record<string, IProject>
  description: IContent
}

export default function Home({ projects }: HomeProps) {
  return (
    <>
      <Head>
        <title>Nanda Syahrasyad</title>
        <meta
          name="description"
          content="Nanda Syahrasyad is a full-stack software developer specializing in building beautiful web applications and streamlining developer workflows."
        />
      </Head>
      <Circle
        className="bg-blue-600 -right-12 -top-10"
        radius="10rem"
        delay={0.2}
      />
      <Circle
        radius="12rem"
        className="bg-blue-700 top-1/4 -right-16"
        delay={0.3}
      />
      <Circle
        radius="16rem"
        className="bg-blue-900 top-1/3 -left-16"
        delay={0.4}
      />
      <Circle
        radius="12rem"
        className="bg-blue-500 bottom-80 -right-16"
        delay={0.5}
      />
      <Content>
        <div
          style={{ gap: 12 }}
          className="grid grid-flow-col auto-cols-max md:grid-rows-3 md:grid-cols-3 md:absolute md:left-16 lg:left-24 xl:fixed"
        >
          <Dots />
          <Dots />
          <Dots />
          <Dots className="hidden md:grid" />
          <Dots className="hidden md:grid md:col-start-3" />
        </div>
        <header className="relative">
          <Circle className={clsx('bg-blue-800', styles.hero_circle)} />
          <motion.img
            className={clsx(
              'relative z-10 object-cover w-16 h-16 mb-8 bg-gray-400 border-2 border-gray-400 rounded-full',
              'md:w-20 md:h-20'
            )}
            src="./avatar.jpg"
            alt="Headshot of Nanda Syahrasyad"
            variants={{
              hidden: {
                scale: 0,
              },
              shown: {
                scale: 1,
              },
            }}
            initial="hidden"
            animate="shown"
            transition={{
              type: 'spring',
              damping: 5,
              mass: 0.2,
              delay: 0.2,
            }}
          />
          <div
            className={clsx(
              'relative z-10 mb-4 space-y-4 font-semibold flex flex-col',
              'md:space-y-6 md:mb-6',
              'xl:items-start xl:text-left xl:space-y-10'
            )}
          >
            <h1 className={clsx('flex text-3xl', 'md:text-5xl', 'xl:text-6xl')}>
              Hey, I'm Nanda
              <Wave />
            </h1>
            <p
              style={{ lineHeight: 1.4 }}
              className={clsx(
                'text-lg space-y-4',
                'md:text-xl',
                'lg:text-2xl',
                'xl:text-3xl'
              )}
            >
              Lego connoisseur, student,{' '}
              <span className={styles.emphasis}>full-stack developer</span>.
              Occasional writer @{' '}
              <ExternalLink href="https://nan.fyi/">Not a Number</ExternalLink>.
            </p>
            <ul className="flex space-x-4 text-lg">
              <li>
                <SocialMedia
                  label="Resume"
                  link="/resume.pdf"
                  icon={<FaFileAlt />}
                />
              </li>
              <li>
                <SocialMedia
                  label="Mail to nanda.s@hey.com"
                  link="mailto:nanda.s@hey.com"
                  icon={<FaPaperPlane />}
                />
              </li>
              <li>
                <SocialMedia
                  label="GitHub"
                  link="https://github.com/narendrasss"
                  icon={<FaGithub />}
                />
              </li>
              <li>
                <SocialMedia
                  label="LinkedIn"
                  link="https://linkedin.com/in/narendrass/"
                  icon={<FaLinkedinIn />}
                />
              </li>
              <li>
                <SocialMedia
                  label="Twitter"
                  link="https://twitter.com/nansdotio"
                  icon={<FaTwitter />}
                />
              </li>
            </ul>
          </div>
        </header>
        <section className="space-y-4">
          <p className="text-gray-200">
            I'm a senior @ UBC, finishing up my Business and CS degree in May of
            2021.
          </p>
          <p className="text-gray-200">
            On the side, I lead engineering for a small mobile app to reduce
            food waste (launching Soon™ @{' '}
            <a
              href="https://pekoapp.com/"
              className="font-semibold text-blue-400"
            >
              pekoapp.com
            </a>
            ). I also lead a software engineering team of 10 students @{' '}
            <a
              href="https://ubclaunchpad.com/"
              className="font-semibold text-blue-400"
            >
              UBC Launch Pad
            </a>
            , building the next best scheduling tool for friends.
          </p>
        </section>
        <section className="relative mb-12">
          <Dots className="mb-6" />
          <div className={clsx('space-y-4', '-mt-2')}>
            <h1 className="relative z-10 text-2xl font-semibold">Projects</h1>
            <p className="relative z-10 text-gray-200">
              Over the last year I've been lucky to have met some incredible
              people to do projects with. Here are some of my favourites.
            </p>
          </div>
        </section>
        <ul
          className={clsx(
            'space-y-8 px-8 full-width',
            'md:grid md:grid-cols-2 md:space-y-0 md:gap-8',
            styles.project_list
          )}
        >
          <ProjectCard
            frontmatter={playgroundMeta as IProject['frontmatter']}
            className={clsx('bg-gray-700', styles.playground)}
            highlightColor="bg-gray-600"
          >
            <ProjectImage frontmatter={playgroundMeta} className="-ml-8" />
          </ProjectCard>
          <ProjectCard
            frontmatter={projects.keepFresh.frontmatter}
            className={clsx('bg-green-600', styles.keepFresh)}
            highlightColor="bg-green-500"
          >
            <ProjectImage
              frontmatter={projects.keepFresh.frontmatter}
              className="-mb-8 -ml-6"
            />
          </ProjectCard>
          <ProjectCard
            frontmatter={projects.evital.frontmatter}
            className={clsx('bg-red-500', styles.evital)}
            highlightColor="bg-red-400"
          >
            <ProjectImage
              frontmatter={projects.evital.frontmatter}
              className="mt-4"
              width="100%"
            />
          </ProjectCard>
          <ProjectCard
            frontmatter={projects.visualizer.frontmatter}
            className={clsx('pb-2 text-blacks-900', styles.visualizer)}
            highlightColor="hsl(24, 54%, 90%)"
          >
            <ProjectImage
              frontmatter={projects.visualizer.frontmatter}
              className="-ml-8"
            />
          </ProjectCard>
        </ul>
        <section>
          <Dots className="mb-6" />
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold">Skills</h1>
            <p className="relative z-10 text-gray-200">
              I spend quite a bit of my free time tinkering around with code and
              new technologies. Here are the ones I'm most comfortable with:
            </p>
            <ul className="grid grid-cols-2 grid-rows-3 list-disc list-inside">
              {[
                'JavaScript',
                'React',
                'TypeScript',
                'Node',
                'Vue',
                'PHP',
                'WordPress',
                'Git',
              ].map((tech) => (
                <li key={tech} className="relative z-10">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="space-y-4">
          <Dots className="mb-6" />
          <h1 className="relative z-10 text-2xl font-semibold">
            Let's get to know each other.
          </h1>
          <p className="text-gray-200">
            I'm not currently looking for full-time work, but I would love to
            get to know you anyway! Let's have a chat.
          </p>
          <a
            className="block font-semibold text-gray-400"
            href="mailto:nanda.s@hey.com"
          >
            nanda.s@hey.com
          </a>
        </section>
        <footer className="flex items-center justify-between text-gray-500 full-width">
          <Dots numX={1} />
          <section>
            <p className="mb-2 font-mono text-sm text-center">
              Nanda Syahrasyad 2021
            </p>
            <ul className="flex justify-center space-x-4 text-lg">
              <li>
                <SocialMedia
                  label="GitHub"
                  link="https://github.com/narendrasss"
                  icon={<FaGithub />}
                />
              </li>
              <li>
                <SocialMedia
                  label="LinkedIn"
                  link="https://linkedin.com/in/narendrass/"
                  icon={<FaLinkedinIn />}
                />
              </li>
              <li>
                <SocialMedia
                  label="Twitter"
                  link="https://twitter.com/nansdotio"
                  icon={<FaTwitter />}
                />
              </li>
            </ul>
          </section>
          <Dots numX={1} />
        </footer>
      </Content>
    </>
  )
}

function ExternalLink({ children, className, ...props }: HTMLMotionProps<'a'>) {
  return (
    <motion.a
      target="_blank"
      rel="noreferrer"
      className={clsx('relative font-semibold text-blue-400', className)}
      initial="idle"
      whileHover="hover"
      {...props}
    >
      <motion.span
        className="absolute bottom-0 w-full bg-blue-400"
        style={{ height: 4 }}
        variants={{
          idle: {
            opacity: 0,
            y: 0,
          },
          hover: {
            opacity: 1,
            y: 8,
          },
        }}
      />
      {children}
    </motion.a>
  )
}

export async function getStaticProps() {
  const keepFresh = await getProjectBySlug('keep-fresh.md')
  const visualizer = await getProjectBySlug('visualizer.md')
  const evital = await getProjectBySlug('evital.md')
  const description = await getContentBySlug('description.md')

  return {
    props: {
      description,
      projects: { keepFresh, visualizer, evital },
    },
  }
}
