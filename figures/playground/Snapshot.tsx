import { motion } from 'framer-motion'

import CodeBlock from '../../components/CodeBlock'

const code = `function sum(numbers) {
  let sum = 0;
  for (const num of numbers) {
    sum += num;
    debugger;
  }
  return sum;
}`

const vars = {
  numbers: [1, 2, 3],
  num: 1,
  sum: 1,
}

const variants = {
  show: {
    y: 0,
    opacity: 0.1,
    transition: {
      type: 'spring',
      bounce: 0.5,
    },
  },
  hide: {
    y: 50,
    opacity: 0,
  },
}

const list = {
  show: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
  hide: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
}

const item = {
  show: {
    opacity: 1,
    y: 0,
  },
  hide: {
    opacity: 0,
    y: 20,
  },
}

export default function Snapshot() {
  return (
    <figure className="flex items-center justify-center">
      <div className="relative pt-12 pb-20" style={{ width: `20rem` }}>
        <div className="relative transform skew-y-6">
          <div className="absolute w-full h-full bg-gray-600 rounded-lg bottom-2 left-2"></div>
          <CodeBlock
            code={code}
            className="relative p-4 text-sm text-white bg-gray-800 rounded-lg shadow-lg"
          />
          <motion.div
            variants={variants}
            initial="hide"
            animate="show"
            className="absolute w-full h-5 bg-gray-100 shadow-lg -left-4 top-24"
          ></motion.div>
        </div>
        <motion.ul
          className="absolute right-0 space-y-2 font-mono top-36"
          variants={list}
          initial="hide"
          animate="show"
          transition={{ delay: 0.3 }}
        >
          {Object.entries(vars).map(([name, val]) => (
            <motion.li
              key={name}
              className="flex text-sm text-gray-800 rounded-md shadow-md"
              variants={item}
            >
              <p className="flex-1 p-2 bg-gray-300 rounded-l-md">{name}</p>
              <p className="flex-1 p-2 bg-gray-200 rounded-r-md">
                {JSON.stringify(val)}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </figure>
  )
}
