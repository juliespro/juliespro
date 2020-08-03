import React from 'react';
import { graphql } from 'gatsby';
import TitlePage from '../components/TitlePage';
import SEO from '../components/seo';
import Hero from '../components/Hero'

import * as S from '../components/Content/styled';

const Page = props => {
  const post = props.data.markdownRemark;
  const fluid = post.frontmatter.image.childImageSharp.fluid;
  return (
    
    <>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        // image={post.frontmatter.image}
      />
      {fluid && (
        <Hero fluid={fluid}></Hero>
      )}
      <TitlePage text={post.frontmatter.title} />
      <S.Content>
        <div dangerouslySetInnerHTML={{ __html: post.html }}></div>
      </S.Content>
    </>
  );
};
// image
export const query = graphql`
  query Page($locale: String!, $title: String!) {
    markdownRemark(
      frontmatter: { title: { eq: $title } }
      fields: { locale: { eq: $locale } }
    ) {
      frontmatter {
        title
        description
        image {
          childImageSharp {
            fluid(maxWidth: 800) {
              src
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      html
    }
  }
`;

export default Page;
