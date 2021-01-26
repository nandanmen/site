import clsx, { ClassValue } from 'clsx'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import { motion } from 'framer-motion'

import type { IProject } from '../lib/projects'

type ProjectCardProps = {
  frontmatter: IProject['frontmatter']
  className?: ClassValue
  style?: React.CSSProperties
  children?: React.ReactNode
  highlightColor?: string
}

const variants = {
  hover: {
    rotate: -30,
  },
}

export default function ProjectCard({
  frontmatter,
  className,
  style,
  children,
  highlightColor = '',
}: ProjectCardProps) {
  const isTailwind = highlightColor.startsWith('bg')
  return (
    <motion.li
      className={clsx(
        'block w-full h-full rounded-2xl overflow-hidden relative p-8 shadow-lg',
        'xl:p-12',
        className
      )}
      style={style}
      whileHover="hover"
    >
      <motion.div
        variants={{
          hover: {
            scaleY: 1,
            originY: 0,
          },
        }}
        initial={{ scaleY: 0, originY: 0 }}
        className={clsx('absolute top-0 left-0 right-0 h-1/2', {
          [highlightColor]: isTailwind,
        })}
        style={{
          clipPath: 'ellipse(50% 50% at 50% 0%)',
          backgroundColor: !isTailwind && highlightColor,
        }}
      ></motion.div>
      <article className="relative">
        <h1 className="mb-4 text-2xl font-semibold xl:text-4xl">
          {frontmatter.title}
        </h1>
        <p className="mb-4 font-semibold">{frontmatter.blurb}</p>
        {frontmatter.path ? (
          <Link href={frontmatter.path}>
            <a className="flex items-center focus:outline-none">
              <span className="mr-1">Read more</span>
              <motion.span variants={variants}>
                <FiArrowRight />
              </motion.span>
            </a>
          </Link>
        ) : (
          <div className="flex">
            {frontmatter.link && (
              <a
                href={frontmatter.link}
                className="flex items-center mr-4 focus:outline-none"
                target="_blank"
                rel="noreferrer"
              >
                <span className="mr-1">Demo</span>
                <motion.span variants={variants}>
                  <FiArrowRight />
                </motion.span>
              </a>
            )}
            <a
              href={frontmatter.github}
              className="flex items-center focus:outline-none"
              target="_blank"
              rel="noreferrer"
            >
              <span className="mr-1">See the code</span>
              <motion.span variants={variants}>
                <FiArrowRight />
              </motion.span>
            </a>
          </div>
        )}
        {children}
      </article>
    </motion.li>
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
