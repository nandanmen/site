import { AnimateSharedLayout } from 'framer-motion'

export default function Layout({ children }) {
  return (
    <div
      className="relative min-h-screen overflow-x-hidden text-gray-200 bg-blacks-700 md:text-lg xl:text-xl"
      style={{ lineHeight: 1.6 }}
    >
      <AnimateSharedLayout>{children}</AnimateSharedLayout>
    </div>
  )
}
