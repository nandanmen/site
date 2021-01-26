import clsx from 'clsx'
import styles from './Content.module.scss'

export default function Content({ className = '', ...props }) {
  return (
    <main
      className={clsx(
        'p-8 space-y-20 text-white max-w-full',
        'md:p-16 md:space-y-28',
        'lg:px-32 lg:py-24',
        'xl:px-48',
        styles.main,
        className
      )}
      {...props}
    />
  )
}
