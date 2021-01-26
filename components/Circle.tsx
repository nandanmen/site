import clsx, { ClassValue } from 'clsx'
import { HTMLMotionProps, motion } from 'framer-motion'

type CircleProps = {
  radius?: number | string
  delay?: number
  className?: ClassValue
} & HTMLMotionProps<'div'>

export default function Circle({
  radius = null,
  className,
  delay = 0,
  ...props
}: CircleProps) {
  return (
    <motion.div
      style={{ width: radius, height: radius }}
      className={clsx('absolute z-0 rounded-full', className)}
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
        delay,
      }}
      {...props}
    />
  )
}
