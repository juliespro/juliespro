import { throttle } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import { useEventListener, useOnClickOutside } from '../../hooks'
import { Title, TocDiv, TocIcon, TocLink, TocToggle } from './styled'
import useTranslations from '../useTranslations';

const accumulateOffsetTop = (el, totalOffset = 0) => {
  while (el) {
    totalOffset += el.offsetTop - el.scrollTop + el.clientTop
    el = el.offsetParent
  }
  return totalOffset
}

export default function Toc({ headingSelector, getTitle, getDepth, ...rest }) {
  const { throttleTime = 200
    // , tocTitle = `Contents` 
  } = rest
  const { tocTitle, comment } = useTranslations();
  const [headings, setHeadings] = useState({
    titles: [],
    nodes: [],
    minDepth: 0,
  })
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState()
  const ref = useRef()
  useOnClickOutside(ref, () => setOpen(false))
  useEffect(() => {
    // Fallback to sensible defaults for headingSelector, getTitle and getDepth
    // inside useEffect rather than specifying them as Toc default props to avoid
    // the need for useMemo and useCallback, resp.
    // Otherwise, these would change on every render and since this effect calls
    // setHeadings which triggers a rerender, it would cause an infinite loop.

    const selector =
      headingSelector || Array.from({ length: 5 }, (_, i) => `section > div > h` + (i + 2))
    const nodes = Array.from(document.querySelectorAll(selector))
    const titles = nodes.map(node => ({
      title: getTitle ? getTitle(node) : node.innerText,
      depth: getDepth ? getDepth(node) : Number(node.nodeName[1]),
    }))
    const minDepth = Math.min(...titles.map(h => h.depth))
    setHeadings({ titles, nodes, minDepth })
  }, [headingSelector, getTitle, getDepth])

  const scrollHandler = throttle(() => {
    const { titles, nodes } = headings
    // Offsets need to be recomputed because lazily-loaded
    // content increases offsets as user scrolls down.
    const offsets = nodes.map(el => accumulateOffsetTop(el))
    const activeIndex = offsets.findIndex(
      offset => (offset) > window.scrollY + 0.8 * window.innerHeight
      // +696+450-420-0.04*window.innerHeight
    )
    if(!!nodes && !!nodes[activeIndex-1]){
      // console.log(nodes[activeIndex-1])
      // window.location.hash = '#'+nodes[activeIndex-1].id
    }
    setActive(activeIndex === -1 ? titles.length - 1 : activeIndex - 1)
  }, throttleTime)
  useEventListener(`scroll`, scrollHandler)

  return (
    <> 
      <TocToggle opener open={open} onClick={() => setOpen(true)} size={'3.2em'} />
      <TocDiv ref={ref} open={open}>
        <Title>
          <TocIcon />
          {tocTitle}
          <TocToggle onClick={() => setOpen(false)} />
        </Title>
        <nav>
          {headings.titles.map(({ title, depth }, index) => {
            // if get title 'Comment' use translation one 
            title = title == 'Comment' ? comment: title;
            return (
            <TocLink
              key={title}
              active={active === index}
              depth={depth - headings.minDepth}
              onClick={event => {
                event.preventDefault()
                setOpen(false)
                headings.nodes[index].scrollIntoView({
                  behavior: `smooth`,
                  block: `center`,
                })
              }}
            >
              {title}
            </TocLink>
          )}
          )}
        </nav>
      </TocDiv>
    </>
  )
}