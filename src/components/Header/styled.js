import styled from 'styled-components';
import media from 'styled-media-query';
import LocalizedLink from '../LocalizedLink';
import img from '../../../static/assets/img/cover.jpg'

// background-color: black;
// background-image: url(${img});  
// background-size: cover;
// background-position: center 30%;
// background-color: var(--bg-light);
// background-color: none;
export const HeaderWrapper = styled.div`
  background: linear-gradient(
    to bottom,
    rgba(0,0,0,0.4), 
    rgba(0,0,0,0)
  );
  ${media.greaterThan('large')`
    margin-bottom: var(--space);
  `}
`;

export const Container = styled.div`
// text shadow
  text-shadow: rgb(0, 0, 0) 0px 0px 60px;
  display: flex;
  flex-direction: column;
  max-width: var(--width-container);
  margin: 0 auto;
  justify-content: flex-start;
  align-items: center;
  padding: calc(var(--space) * 1.3) var(--space);
  position: relative;
  ${media.greaterThan('medium')`
    flex-direction: row;
  `}
  ${media.greaterThan('large')`
    padding: calc(var(--space)*1.3) var(--space-sm);
  `}
`;

export const LogoLink = styled(LocalizedLink)`
  display: inline-block;
  margin-right: 0.5rem;
  width: 170px;
`;

export const ButtonMenu = styled.div`
  &.is-active {}
`;

export const NavMenu = styled.div`
  width: 100%;
  display: none;
  ${media.greaterThan('medium')`
    margin-left: auto;
    width: auto;
    display: block;
  `}
  &.is-active {
    display: block;
  }
`;

export const NavLanguages = styled.div`
  margin-left: var(--space);
`;
