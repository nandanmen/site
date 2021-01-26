import React from 'react'

export default function Refresh({ children }) {
  const [count, setCount] = React.useState(0)
  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>Refresh</button>
      <div key={count}>{children}</div>
    </>
  )
}
