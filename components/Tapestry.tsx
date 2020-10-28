const CENTER = { x: 50, y: 50 };
const NODES = [
  { x: 80, y: 70 },
  { x: 20, y: 20 },
  { x: 15, y: 75 },
];

export default function Tapestry() {
  return (
    <svg className="fill-current text-teal-400 w-full" viewBox="0 0 100 100">
      {NODES.map(({ x, y }) => (
        <line
          key={`link-${x}-${y}`}
          strokeWidth="2"
          stroke="currentColor"
          x1={x}
          x2={CENTER.x}
          y1={y}
          y2={CENTER.y}
        ></line>
      ))}
      <circle r="20" cx={CENTER.x} cy={CENTER.y}></circle>
      {NODES.map((node) => (
        <circle key={`${node.x}-${node.y}`} r="8" cx={node.x} cy={node.y}></circle>
      ))}
    </svg>
  );
}
