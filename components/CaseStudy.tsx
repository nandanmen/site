import clsx from 'clsx'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import Link from 'next/link'
import Head from 'next/head'
import { FiHome } from 'react-icons/fi'

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
      <main className={clsx(styles.main, 'mt-16')}>
        <header className="relative mb-16">
          <Circle className="w-40 h-40 bg-blue-800 -left-16 -top-6" />
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
      </main>
    </>
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
