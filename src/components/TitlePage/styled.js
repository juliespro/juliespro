import styled from 'styled-components';
import media from 'styled-media-query';

export const TitleElement = styled.h1`
  line-height: 140%;
  font-size: 3rem;
  font-weight: bold;
  // margin-top: -115px;
  // color: white;
  // text-shadow: rgb(0, 0, 0) 0px 0px 28px;
  margin-bottom: var(--space-lg);

  ${media.greaterThan('medium')`
    line-height: 1.1;
    font-size: 3.5rem;
  `}

  ${media.greaterThan('large')`
    line-height: 1.1;
    font-size: 4rem;
  `}
`;
