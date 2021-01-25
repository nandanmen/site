import CodeBlock from '../../components/CodeBlock'
import Circle from '../../components/Circle'

const source = `for (const num of numbers) {
  sum += num;
  debugger;
}`

const result = `for (const num of numbers) {
  sum += num;
  snapshot({
    sum,
    num,
    numbers
  })
}`

export default function Transpile() {
  return (
    <figure className="flex justify-center">
      <div
        className="relative flex pt-12 pb-40 text-xs"
        style={{ width: '22rem' }}
      >
        <Circle className="w-48 h-48 bg-blue-700 left-1/3 top-4" />
        <div className="transform -skew-y-6">
          <CodeBlock
            code={source}
            className="p-4 text-white bg-gray-800 rounded-lg shadow-xl"
          />
        </div>
        <div className="absolute right-0 transform skew-y-6 top-32">
          <CodeBlock
            code={result}
            className="p-4 text-gray-700 bg-gray-100 rounded-lg shadow-xl"
            variant="light"
          />
        </div>
      </div>
    </figure>
  )
}
