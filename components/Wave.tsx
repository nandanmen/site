import React from 'react'
import { motion } from 'framer-motion'

export default function Wave() {
  const [isBoop, setBooping] = React.useState(false)

  React.useEffect(() => {
    const timeout = window.setTimeout(() => setBooping(true), 500)
    return () => window.clearTimeout(timeout)
  }, [])

  React.useEffect(() => {
    if (!isBoop) {
      return
    }

    const timeout = window.setTimeout(() => setBooping(false), 150)
    return () => window.clearTimeout(timeout)
  }, [isBoop])

  return (
    // eslint-disable-next-line jsx-a11y/accessible-emoji
    <motion.span
      className="block ml-2 lg:ml-4"
      role="img"
      aria-label="hand wave"
      variants={{
        booping: {
          rotate: 40,
        },
        idle: {
          rotate: 0,
        },
      }}
      animate={isBoop ? 'booping' : 'idle'}
      initial="idle"
      transition={{
        type: 'spring',
        damping: 3,
        mass: 0.2,
      }}
    >
      👋
    </motion.span>
  )
}
