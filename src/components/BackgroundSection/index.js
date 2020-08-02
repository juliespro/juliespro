import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'

import BackgroundImage from 'gatsby-background-image'

const BackgroundSection = ({ className, image }) => {
    return(
  <StaticQuery
    query={graphql`
      query {
        fileName: file(relativePath: { eq: "cover.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      // Set ImageData.
      const imageData = data.fileName.childImageSharp.fluid
      console.log(image);
      return (
        <BackgroundImage
          Tag="section"
          className={className}
          fluid={imageData}
          backgroundColor={`#040e18`}
        >
        </BackgroundImage>
      )
    }}
  />
)}

const StyledBackgroundSection = styled(BackgroundSection)`
  margin-top: -500px;
  margin-bottom: 40px;
  height: 800px;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  background-position: bottom center;
  background-repeat: repeat-y;
  background-size: cover;
  z-index: -1;
`

export default StyledBackgroundSection