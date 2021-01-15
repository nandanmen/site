import { AnimateSharedLayout } from 'framer-motion'

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-white bg-blacks-900 md:text-lg xl:text-2xl">
      <AnimateSharedLayout>{children}</AnimateSharedLayout>
    </div>
  )
}
