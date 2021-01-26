export default function Figure({ caption, children, fullWidth = false }) {
  const className = fullWidth && 'full-width'
  return (
    <figure className={className}>
      {children}
      {caption && (
        <figcaption className="w-3/4 mx-auto mt-4 text-sm italic text-center text-gray-300 lg:text-base">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
