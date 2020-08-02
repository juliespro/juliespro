import React from 'react';
import BackgroundImage from 'gatsby-background-image'
import styled from 'styled-components'

export const Hero = ({fluid, className}) => (
    <BackgroundImage
        Tag="section"
        className={className}
        fluid={fluid}
        backgroundColor={`#040e18`}
    >
    </BackgroundImage>
)


const StyledHero = styled(Hero)`
  margin-top: -400px;
  margin-bottom: 40px;
  height: calc(5vh + 400px);
  width: 100vw;
  margin-left: calc(50% - 50vw);
  background-position: center;
  background-repeat: repeat-y;
  background-size: cover;
  z-index: -1;
`


export default StyledHero