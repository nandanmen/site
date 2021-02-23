import Link from 'next/link'
import { FiHome } from 'react-icons/fi'
import tw, { styled } from 'twin.macro'

import Dots from './Dots'

export default function Experiment({ children }) {
  return (
    <>
      <nav tw="flex items-center p-8">
        <ul tw="text-xl">
          <li>
            <Link href="/">
              <a>
                <FiHome />
              </a>
            </Link>
          </li>
        </ul>
        <Dots className="ml-auto" />
      </nav>
      <Grid>
        <aside>
          <nav>
            <Link href="/experiments">
              <a>Experiments</a>
            </Link>
            <ul tw="pl-6">
              <li>
                <Link href="/experiments/css-transitions-sandbox">
                  CSS Transitions Sandbox
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        <Main>{children}</Main>
      </Grid>
    </>
  )
}

const Main = styled.main`
  justify-self: center;
`

const Grid = styled.div`
  ${tw`grid flex-grow p-8 pt-0 gap-x-6`}

  grid-template-columns: clamp(10rem, 20vw, 20rem) 1fr;
  align-content: center;
`
