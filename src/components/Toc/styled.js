import styled, { css } from 'styled-components'
import { BookContent } from 'styled-icons/boxicons-regular'
import { Close as Cross } from 'styled-icons/material'
import mediaQuery from '../../utils/mediaQuery'

export const TocDiv = styled.aside`
  background: var(--color-background);
  padding: 0.7em 1.2em;
  margin: 1em 0;
  margin-right: 2%;
  border-radius: 0.5em;
  box-shadow: 0 0 1em 3px var(--color-shadow);
  height: max-content;
  max-height: 80vh;
  z-index: 3;
  line-height: 2.2em;
  right: 1em;
  width: 18em;
  overscroll-behavior: none;
  grid-row: span 10;
  nav {
    max-height: 78vh;
    overflow-y: scroll;
  }
  ${mediaQuery.maxDesktop} {
    position: fixed;
    bottom: 1em;
    left: 1em;
    ${props => !props.open && `height: 0;`};
    visibility: ${props => (props.open ? `visible` : `hidden`)};
    opacity: ${props => (props.open ? 1 : 0)};
    transition: 0.3s;
  }
  ${mediaQuery.minDesktop} {
    font-size: 0.85em;
    grid-column: 4 / -1;
    position: sticky;
    top: 2em;
    margin-top: 2em;
    display: inline-block;
  }
`

export const Title = styled.h2`
  margin: 0;
  font-weight: bold;
  font-size: 24px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  // padding-bottom: 0.5em;
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-template-columns: auto auto 1fr;
  color: var(--color-gray);
  border-bottom: 0px;
  margin-bottom: 0px;
  padding-bottom: 15px;
`

export const TocLink = styled.a`
  cursor: pointer;
  color: ${p => (p.active ? `var(--color-c)` : `var(--color-text)`)};
  font-weight: ${props => props.active && `bold`};
  display: block;
  margin-left: ${props => props.depth + `em`};
`

export const TocIcon = styled(BookContent)`
  width: 1em;
  margin-right: 0.2em;
`

const openerCss = css`
  position: fixed;
  bottom: calc(1vh + 2em);
  ${mediaQuery.minPhablet} {
    bottom: calc(1vh + 1em);
  }
  left: 2em;
  padding: 0.5em 0.6em 0.5em 0.6em;
  background: var(--color-background);
  border: 2px solid var(--color-text);
  border-radius: 50% 50% 50% 50%;
  transform: translate(${props => (props.open ? `-100%` : 0)});
`

export const TocToggle = styled(Cross).attrs(props => ({
  as: props.opener && BookContent,
  size: props.size || `1.6em`,
}))`
  z-index: 2;
  transition: 0.3s;
  justify-self: end;
  :hover {
    transform: scale(1.1);
  }
  ${mediaQuery.minDesktop} {
    display: none;
  }
  ${props => props.opener && openerCss};
`