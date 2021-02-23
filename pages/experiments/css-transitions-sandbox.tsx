import React from 'react'
import BezierEasing from 'bezier-easing'
import { BsPlay, BsStop } from 'react-icons/bs'
import { FaGithub } from 'react-icons/fa'
import useInterval from '@use-it/interval'
import { motion } from 'framer-motion'
import tw, { styled } from 'twin.macro'

import Experiment from '../../components/Experiment'

const easingFunctions = {
  linear: [0, 0, 1, 1],
  ease: [0.25, 0.1, 0.25, 1],
  'ease-in': [0.42, 0, 1, 1],
  'ease-out': [0, 0, 0.58, 1],
  'ease-in-out': [0.42, 0, 0.58, 1],
  'ease (supercharged)': [0.44, 0.21, 0, 1],
  'ease-in (supercharged)': [0.75, 0, 1, 1],
  'ease-out (supercharged)': [0.215, 0.61, 0.355, 1],
  'ease-in-out (supercharged)': [0.645, 0.045, 0.355, 1],
  custom: null,
}

const shapes = ['circle', 'square']

function TransitionSandbox() {
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [fps, setFps] = React.useState(60)
  const [easing, setEasing] = React.useState('ease-in-out (supercharged)')
  const [{ x1, x2, y1, y2 }, setCubicBezier] = React.useState({
    x1: 0,
    x2: 0,
    y1: 1,
    y2: 1,
  })
  const [ghostOpacity, setGhostOpacity] = React.useState(0.2)
  const [shape, setShape] = React.useState('circle')

  const easingFunction = React.useMemo(() => BezierEasing(x1, y1, x2, y2), [
    x1,
    y1,
    x2,
    y2,
  ])
  const steps = React.useMemo(() => getSteps(easingFunction, fps), [
    easingFunction,
    fps,
  ])

  const [activeStepIndex, setActiveStepIndex] = React.useState(steps.length - 1)

  React.useEffect(() => {
    setActiveStepIndex(steps.length - 1)
  }, [steps])

  useInterval(
    () => {
      if (activeStepIndex < steps.length - 1) {
        setActiveStepIndex((index) => index + 1)
      } else {
        setIsPlaying(false)
      }
    },
    isPlaying ? 1000 / fps : null
  )

  React.useEffect(() => {
    if (easingFunctions[easing]) {
      const [x1, y1, x2, y2] = easingFunctions[easing]
      setCubicBezier({ x1, y1, x2, y2 })
    }
  }, [easing])

  return (
    <div className="relative p-6 space-y-8 text-sm text-white bg-blacks-500 rounded-xl md:p-12">
      <h1 className="font-semibold">{fps} FPS</h1>
      <div className="relative h-12 mr-12">
        {steps.map((step, index) => (
          <Shape
            key={step}
            style={{
              '--x': `${step * 100}%`,
              '--opacity':
                index === activeStepIndex
                  ? 1
                  : index > activeStepIndex
                  ? 0
                  : ghostOpacity,
            }}
            className="absolute top-0 w-12 h-12 border-4 border-blue-400 shape"
            variants={{
              circle: {
                borderRadius: 24,
              },
              square: {
                borderRadius: 8,
              },
            }}
            initial={shape}
            animate={shape}
          />
        ))}
      </div>
      <form className="space-y-4" onSubmit={(evt) => evt.preventDefault()}>
        <div className="flex items-center w-full space-x-4">
          <Field label="Timeline" className="flex-1">
            <Slider
              type="range"
              min="0"
              value={activeStepIndex}
              max={steps.length - 1}
              onChange={(evt) => setActiveStepIndex(Number(evt.target.value))}
            />
          </Field>
          <Field label="FPS" className="flex-1">
            <Slider
              type="range"
              min="5"
              max="60"
              value={fps}
              onChange={(evt) => setFps(evt.target.valueAsNumber)}
            />
          </Field>
          <motion.button
            className="flex items-center justify-center w-12 h-12 text-3xl text-black bg-white rounded-lg focus:outline-none focus:ring-4 ring-red-700"
            onClick={() => {
              if (isPlaying) {
                setIsPlaying(false)
              } else {
                setActiveStepIndex((index) =>
                  index === steps.length - 1 ? 0 : index
                )
                setIsPlaying(true)
              }
            }}
            initial={{ y: 14 }}
            animate={{ y: 14 }}
            whileTap={{ scale: 0.9 }}
          >
            {isPlaying ? <BsStop /> : <BsPlay />}
          </motion.button>
        </div>
        <div className="flex flex-wrap" style={{ gap: '1rem' }}>
          <Field label="Timing Function">
            <Select
              options={Object.keys(easingFunctions)}
              value={easing}
              onChange={setEasing}
            />
          </Field>
          <Field label="Shape">
            <Select
              options={shapes}
              className="capitalize"
              value={shape}
              onChange={setShape}
            />
          </Field>
          <Field label="Ghost Opacity" style={{ flexGrow: 1 }}>
            <Slider
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={ghostOpacity}
              onChange={(evt) => setGhostOpacity(evt.target.valueAsNumber)}
            />
          </Field>
        </div>
        <div className="flex space-x-4">
          <CubicBezierEditor
            value={{ x1, y1, x2, y2 }}
            onChange={(curve) => {
              if (easing !== 'custom') {
                setEasing('custom')
              }
              setCubicBezier(curve)
            }}
          />
          <CubicBezierCurve
            curve={{ x1, x2, y1, y2 }}
            progress={activeStepIndex / (steps.length - 1)}
          />
        </div>
      </form>
    </div>
  )
}

// --

function CubicBezierEditor({ value, onChange, style = {} }) {
  const { x1, y1, x2, y2 } = value
  const handleChange = (evt) => {
    onChange({
      ...value,
      [evt.target.name]: evt.target.value,
    })
  }
  return (
    <div
      className="grid grid-cols-2 gap-4"
      style={{ gridAutoRows: 'min-content', ...style }}
    >
      <Field label="x1">
        <input
          className="block w-full p-2 mt-2 rounded-md bg-blacks-300 ring-red-700 focus:outline-none focus:ring-4"
          type="number"
          name="x1"
          value={x1}
          onChange={handleChange}
          step="0.01"
        />
      </Field>
      <Field label="y1">
        <input
          className="block w-full p-2 mt-2 rounded-md bg-blacks-300 ring-red-700 focus:outline-none focus:ring-4"
          type="number"
          name="y1"
          value={y1}
          onChange={handleChange}
          step="0.01"
        />
      </Field>
      <Field label="x2">
        <input
          className="block w-full p-2 mt-2 rounded-md bg-blacks-300 ring-red-700 focus:outline-none focus:ring-4"
          type="number"
          name="x2"
          value={x2}
          onChange={handleChange}
          step="0.01"
        />
      </Field>
      <Field label="y2">
        <input
          className="block w-full p-2 mt-2 rounded-md bg-blacks-300 ring-red-700 focus:outline-none focus:ring-4"
          type="number"
          name="y2"
          value={y2}
          onChange={handleChange}
          step="0.01"
        />
      </Field>
      <div tw="col-span-2 mt-8 w-3/4">
        Originally by{' '}
        <ExternalLink href="https://twitter.com/JoshWComeau">
          @JoshWComeau
        </ExternalLink>{' '}
        in his post on{' '}
        <ExternalLink href="https://www.joshwcomeau.com/animation/css-transitions/">
          CSS transitions
        </ExternalLink>
        . Check him out!
      </div>
    </div>
  )
}

const BALL_RADIUS = 24

function CubicBezierCurve({ curve, style = {}, progress }) {
  const { x1, y1, x2, y2 } = curve
  const currentY = BezierEasing(x1, y1, x2, y2)(progress)
  const path = `M 0 0 C ${x1 * 1000} ${y1 * 1000}, ${x2 * 1000} ${
    y2 * 1000
  }, 1000 1000`
  return (
    <div
      className="max-w-sm p-4 transform rounded-lg bg-blacks-300"
      style={style}
    >
      <svg
        viewBox={`-${BALL_RADIUS} -${BALL_RADIUS} ${1000 + BALL_RADIUS * 2} ${
          1000 + BALL_RADIUS * 2
        }`}
        width="100%"
      >
        <g className="text-gray-400">
          <motion.path
            initial={{
              d: path,
            }}
            animate={{
              d: path,
            }}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
          />
        </g>
        <g
          className="text-red-700"
          transform={`translate(${progress * 1000}, ${currentY * 1000})`}
        >
          <circle r={BALL_RADIUS} fill="currentColor" />
        </g>
      </svg>
    </div>
  )
}

// --

function Select({ className = '', onChange, options, ...props }) {
  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select
      className={`block w-full p-2 pr-4 mt-2 bg-blacks-300 rounded-md ring-red-700 focus:outline-none focus:ring-4 ${className}`}
      onChange={(evt) => onChange(evt.target.value)}
      {...props}
    >
      {options.map((option) => (
        <option key={option}>{option}</option>
      ))}
    </select>
  )
}

function Field({ label, className = '', children, style = {} }) {
  return (
    <label className={`space-y-2 ${className}`} style={style}>
      <span className="text-sm font-semibold uppercase">{label}</span>
      {children}
    </label>
  )
}

function ExternalLink(props) {
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    <a
      className="font-semibold hover:text-red-500"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  )
}

// --

const Slider = styled.input`
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  width: 100%; /* Specific width is required for Firefox. */
  background: transparent; /* Otherwise white in Chrome */

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    ${tw`w-4 h-4 bg-gray-400 rounded-lg`};
    margin-top: -6px;
  }

  &:focus {
    outline: none; /* Removes the blue border. You should probably do some kind of focus styling for accessibility reasons though. */
  }

  &::-ms-track {
    width: 100%;
    cursor: pointer;

    /* Hides the slider so custom styles can be added */
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  &::-webkit-slider-runnable-track {
    ${tw`w-full h-1 bg-gray-700 rounded-full`}
  }

  &::-moz-range-track {
    ${tw`w-full h-1 bg-gray-700 rounded-full`}
  }
`

const Shape = styled(motion.div)`
  position: absolute;
  left: var(--x);
  opacity: var(--opacity);
`

// --

function getSteps(easingFn, fps) {
  const steps = Array.from({ length: fps })
    .fill(-1)
    .map((_, index) => easingFn(index / fps))
  steps.push(easingFn(1))
  return steps
}

export default function CSSTransitionSandbox() {
  return (
    <Experiment>
      <TransitionSandbox />
    </Experiment>
  )
}
