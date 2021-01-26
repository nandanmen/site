import { motion } from 'framer-motion'

export default function SocialMedia({
  link,
  icon,
  label,
}: {
  link: string
  icon: React.ReactNode
  label: string
}) {
  return (
    <motion.a
      className="relative flex items-center justify-center text-xl focus:outline-none hover:text-white"
      aria-label={label}
      href={link}
      target="_blank"
      rel="noreferrer"
      initial="idle"
      variants={{ idle: {}, hover: {} }}
      whileHover="hover"
      whileFocus="hover"
    >
      <motion.span
        className="absolute w-12 h-12 bg-blue-500 rounded-full"
        variants={{
          idle: {
            scale: 0,
          },
          hover: {
            scale: 1,
          },
        }}
        initial="idle"
        transition={{
          type: 'spring',
          damping: 5,
          mass: 0.2,
        }}
      ></motion.span>
      <motion.span
        className="relative"
        variants={{ idle: { rotate: 0 }, hover: { rotate: -20 } }}
      >
        {icon}
      </motion.span>
    </motion.a>
  )
}
