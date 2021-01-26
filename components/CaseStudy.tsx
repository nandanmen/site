import clsx from 'clsx'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import Link from 'next/link'
import Head from 'next/head'
import { FiHome } from 'react-icons/fi'
import { motion } from 'framer-motion'

import Circle from './Circle'
import Dots from './Dots'
import SocialMedia from './SocialMedia'
import styles from './CaseStudy.module.scss'

export default function CaseStudy({ meta, children }) {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
      </Head>
      <nav className="flex items-center p-8">
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
      <main className={clsx(styles.main, 'my-16 p-8')}>
        <header className="relative mb-16">
          <Circle className="w-40 h-40 bg-blue-800 -left-16 -top-6 lg:w-64 lg:h-64 lg:-left-32 lg:-top-16" />
          <div
            className={clsx(
              'relative z-10 space-y-4 font-semibold flex flex-col mb-16',
              'md:space-y-6'
            )}
          >
            <h1 className={clsx('text-5xl', 'xl:text-6xl')}>{meta.title}</h1>
            <p>{meta.blurb}</p>
          </div>
          <ul className="relative z-10 flex justify-between">
            <MetaItem title="Type">
              <p className="text-xs md:text-sm xl:text-base">{meta.type}</p>
            </MetaItem>
            <MetaItem title="Tech Stack">
              <ul className="space-y-1 text-xs md:text-sm xl:text-base">
                {meta.tech.map((techName: string) => (
                  <li key={techName}>{techName}</li>
                ))}
              </ul>
            </MetaItem>
            <MetaItem title="Code">
              <p>
                <SocialMedia
                  label={`${meta.title} repository`}
                  link={meta.github}
                  icon={<FaGithub />}
                />
              </p>
            </MetaItem>
            {meta.link && (
              <MetaItem title="Demo">
                <p>
                  <SocialMedia
                    label={`${meta.title} demo`}
                    link={meta.link}
                    icon={<FaExternalLinkAlt />}
                  />
                </p>
              </MetaItem>
            )}
          </ul>
        </header>
        {children}
        <footer className="relative flex justify-center p-4 pb-10 mt-16 bg-gray-800 rounded-2xl">
          <h1 className="text-sm text-center lg:text-base xl:text-lg">
            Thanks for reading! For more, check out the code or play around with
            the demo.
          </h1>
          <ul className="absolute flex justify-center space-x-2 text-xl -bottom-6">
            <li>
              <ExternalLink href={meta.github}>
                <FaGithub />
              </ExternalLink>
            </li>
            {meta.link && (
              <li>
                <ExternalLink href={meta.link}>
                  <FaExternalLinkAlt />
                </ExternalLink>
              </li>
            )}
          </ul>
        </footer>
      </main>
      <footer>
        <ul className="flex justify-between p-8 font-mono text-sm text-gray-500 lg:text-base">
          <li className="flex-1">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <Dots className="transform rotate-45" />
          <li className="flex-1 text-right">
            <a href="/resume.pdf">Resume</a>
          </li>
        </ul>
      </footer>
    </>
  )
}

function ExternalLink({ href, children }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center justify-center w-12 h-12 bg-gray-700 rounded-full hover:bg-blue-700"
      whileHover={{
        scale: 1.1,
      }}
    >
      {children}
    </motion.a>
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
