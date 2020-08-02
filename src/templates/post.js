import React from 'react';
import { graphql } from 'gatsby';
import TitlePage from '../components/TitlePage';
import SEO from '../components/seo';
import StyledBackgroundSection from '../components/BackgroundSection'
import Img from "gatsby-image"

import * as S from '../components/Content/styled';

const Post = props => {
  const post = props.data.markdownRemark;

  return (
    <>
      {/* <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        image={post.frontmatter.image}
      /> */}
      {/* <StyledBackgroundSection image={post.frontmatter.image}></StyledBackgroundSection> */}
      {/* <Img fluid={post.frontmatter.image.childImageSharp.fluid}></Img> */}
      {/* <h1>{post.frontmatter.image}</h1> */}
      <TitlePage text={post.frontmatter.title} />
      <S.Content>
        <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
      </S.Content>
    </>
  );
};
// {
//   childImageSharp {
//     fluid(maxWidth: 800) {
//       ...GatsbyImageSharpFluid
//     }
//   }
// }
export const query = graphql`
  query Post($locale: String!, $title: String!) {
    markdownRemark(
      frontmatter: { title: { eq: $title } }
      fields: { locale: { eq: $locale } }
    ) {
      frontmatter {
        title
        description
        image
      }
      html
    }
  }
`;

export default Post;
