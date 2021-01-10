import clsx from 'clsx'
import styles from './SocialMedia.module.scss'

const PREFIXES = ['https://', 'mailto:']

export default function SocialMedia({
  link,
  icon,
  label,
}: {
  link: string
  icon: React.ReactNode
  label: string
}) {
  const prefix = PREFIXES.find((prefix) => link.startsWith(prefix))
  const displayLink = prefix ? link.slice(prefix.length) : link
  return (
    <li className="mr-4 text-lg">
      <a
        aria-label={label}
        className={clsx('hover:text-blue-600', styles.social_link)}
        data-link={displayLink}
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        {icon}
      </a>
    </li>
  )
}
