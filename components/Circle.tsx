import clsx, { ClassValue } from 'clsx'
import { HTMLMotionProps, motion } from 'framer-motion'

type CircleProps = {
  radius?: number | string
  className?: ClassValue
} & HTMLMotionProps<'div'>

export default function Circle({
  radius = null,
  className,
  ...props
}: CircleProps) {
  return (
    <motion.div
      style={{ width: radius, height: radius }}
      className={clsx('absolute z-0 rounded-full', className)}
      {...props}
    />
  )
}
