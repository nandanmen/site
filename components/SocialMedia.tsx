import clsx from 'clsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import styles from './SocialMedia.module.scss'

const PREFIXES = ['https://', 'mailto:']

export default function SocialMedia({
  link,
  icon,
  label,
}: {
  link: string
  icon: IconDefinition
  label: string
}) {
  const prefix = PREFIXES.find((prefix) => link.startsWith(prefix))
  const displayLink = prefix ? link.slice(prefix.length) : link
  return (
    <li className="text-lg mr-4">
      <a
        aria-label={label}
        className={clsx('hover:text-blue-600', styles.social_link)}
        data-link={displayLink}
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon icon={icon} />
      </a>
    </li>
  )
}
