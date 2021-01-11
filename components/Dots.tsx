import clsx from 'clsx'

const DOT_SIZE = 6

export default function Dots({ numX = 2, numY = 2, space = 12, ...props }) {
  const xArr = array(numX)
  const yArr = array(numY)
  return (
    <DotGrid x={numX} y={numY} gap={space} {...props}>
      {xArr.map((_, x) =>
        yArr.map((_, y) => (
          <div
            key={`${x}/${y}`}
            style={{ width: DOT_SIZE, height: DOT_SIZE }}
            className="bg-current rounded-full"
          />
        ))
      )}
    </DotGrid>
  )
}

function DotGrid({ x, y, gap, className = '', ...props }) {
  return (
    <div
      className={clsx('grid', className)}
      style={{
        gap,
        gridTemplateColumns: `repeat(${x}, ${DOT_SIZE}px)`,
        gridTemplateRows: `repeat(${y}, ${DOT_SIZE}px)`,
      }}
      {...props}
    />
  )
}

const array = (length: number) => Array.from({ length }).fill(-1)
