import React from 'react';
import BackgroundImage from 'gatsby-background-image'
import styled from 'styled-components'

const Hero = ({fluid, className, children}) => (
    <BackgroundImage
        Tag="section"
        className={className}
        fluid={fluid}
        backgroundColor={`#040e18`}
    >
      {children}
    </BackgroundImage>
)


const StyledHero = styled(Hero)`
  margin-top: -470px;
  margin-bottom: 40px;
  height: ${props => props.height ? 'calc(4vh + '+props.height+'px)' : 'calc(4vh + 420px)'}; ;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  background-position: center;
  background-repeat: repeat-y;
  background-size: cover;
  z-index: -1;
`


export default StyledHero