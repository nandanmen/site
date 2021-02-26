import Link from 'next/link'
import Head from 'next/head'
import { FaArrowRight } from 'react-icons/fa'
import { FiHome } from 'react-icons/fi'
import { motion } from 'framer-motion'
import tw, { styled, theme } from 'twin.macro'

import Dots from '../../components/Dots'

const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  year: 'numeric',
  day: 'numeric',
})

export default function ExperimentsHome() {
  return (
    <>
      <Head>
        <title>Experiments | Nanda Syahrasyad</title>
      </Head>
      <nav tw="flex items-center p-8">
        <ul tw="text-xl">
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
      <Main>
        <Shape
          className="absolute w-24 text-blue-400 -left-16 top-10"
          r={36}
          style={{
            rotate: 90,
          }}
        />
        <Shape
          className="absolute w-40 text-blue-800 -left-16 top-20 md:w-56 md:-left-24"
          r={60}
          style={{
            rotate: 135,
            scaleX: -1,
          }}
          delay={0.2}
        />
        <Shape
          as="square"
          className="absolute w-40 text-yellow-400 top-40 -right-20"
          r={60}
          style={{
            rotate: 75,
            scaleX: -1,
          }}
          delay={0.2}
        />
        <header tw="relative mb-20">
          <Heading tw="font-semibold mb-8">Experiments</Heading>
          <p tw="pr-16">
            Welcome! This little corner of my website contains the various CSS
            animations, widgets, and other front-end related stuff that I like
            to play around with.
          </p>
        </header>
        <section tw="space-y-4 relative">
          <h1 tw="font-semibold text-2xl">Latest Toys</h1>
          <ul tw="space-y-4">
            <li>
              <a tw="flex items-center justify-between p-4 bg-blacks-500 rounded-xl">
                <div>
                  <h1 tw="text-xl">Hopper</h1>
                  <p tw="text-gray-400 text-sm">
                    Last updated {formatter.format(new Date())}
                  </p>
                </div>
                <span>
                  <FaArrowRight />
                </span>
              </a>
            </li>
            <li>
              <a tw="flex items-center justify-between p-4 bg-blacks-500 rounded-xl">
                <div>
                  <h1 tw="text-xl">CSS Transitions Sandbox</h1>
                  <p tw="text-gray-400 text-sm">
                    Last updated {formatter.format(new Date())}
                  </p>
                </div>
                <span>
                  <FaArrowRight />
                </span>
              </a>
            </li>
          </ul>
        </section>
      </Main>
    </>
  )
}

function Shape({
  as = 'circle',
  r,
  strokeWidth = 8,
  delay = 0,
  className,
  ...props
}) {
  const shapes = {
    circle: `
      M ${-r}, 0
      a ${r},${r} 0 1,0 ${r * 2},0
      a ${r},${r} 0 1,0 ${-(r * 2)},0
    `,
    square: `
      M ${-r}, ${-r} h ${2 * r} v ${2 * r} h ${-(2 * r)} v ${-(
      2 * r +
      strokeWidth / 2
    )}
    `,
  }
  return (
    <svg
      viewBox={`${-(r + strokeWidth / 2)} ${-(r + strokeWidth / 2)} ${
        (r + strokeWidth / 2) * 2
      } ${(r + strokeWidth / 2) * 2}`}
      className={className}
      style={{ overflow: 'visible' }}
    >
      <motion.path
        d={shapes[as]}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        cx="0"
        cy="0"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay }}
        {...props}
      />
    </svg>
  )
}

// --

const Main = tw.main`relative max-w-3xl min-h-full px-8 pb-20 mx-auto text-white pt-28 md:px-16`

const Heading = styled.h1`
  font-size: clamp(${theme`fontSize.4xl`}, 10vw, ${theme`fontSize.7xl`});
`
