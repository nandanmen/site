export default function Figure({ caption, children }) {
  return (
    <figure>
      {children}
      {caption && (
        <figcaption className="w-3/4 mx-auto mt-4 text-sm italic text-center text-gray-300">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
