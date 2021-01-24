import clsx from 'clsx'
import Highlight, { defaultProps } from 'prism-react-renderer'
import darkTheme from 'prism-react-renderer/themes/nightOwl'
import lightTheme from 'prism-react-renderer/themes/nightOwlLight'

export default function CodeBlock({ code, variant = 'dark', ...delegated }) {
  return (
    <Highlight
      {...defaultProps}
      theme={variant === 'dark' ? darkTheme : lightTheme}
      code={code}
      language="jsx"
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={clsx(className, delegated.className)}
          style={{ ...style, backgroundColor: null }}
          {...delegated}
        >
          {tokens.map((line, i) => (
            // eslint-disable-next-line react/jsx-key
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                // eslint-disable-next-line react/jsx-key
                <span {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  )
}
