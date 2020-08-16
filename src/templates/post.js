import React from 'react';
import { graphql, Link } from 'gatsby';
import TitlePage from '../components/TitlePage';
import SEO from '../components/seo';
import StyledBackgroundSection from '../components/BackgroundSection'
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'
import Hero from '../components/Hero'
import Toc from '../components/Toc'

import styled from 'styled-components';

import * as S from '../components/Content/styled';

const Post = props => {
  const post = props.data.markdownRemark;
  // const language = post.fields.locale=='tw'?'zh':post.fields.locale
  const image = post.frontmatter.image
  // const fluid = image && image.childImageSharp ? image.childImageSharp.fluid : image
  const fluid = image.childImageSharp.fluid
  // const imageSrc = fluid && fluid.src ? fluid.src : image 
  const imageSrc = fluid.src
  const showToc = post.frontmatter.showToc
  let disqusConfig = {
  //   url: `${config.siteUrl+location.pathname}`,
    identifier: post.id,
    title: post.frontmatter.title,
    // language: language
  }
  return (
    <>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        image={imageSrc}
      />
      {/* <StyledBackgroundSection image={post.frontmatter.image}></StyledBackgroundSection> */}
      <Hero fluid={fluid} height={620}></Hero>
      {/* <h1>{post.frontmatter.image}</h1> */}
      <TitlePage text={post.frontmatter.title} />
      <S.Sidebar>
        {showToc && <Toc />}  
        <S.Content>
          {/* <div style={{display: 'inline-block', width:'calc( 100% - 20em )', verticalAlign: 'top'}} dangerouslySetInnerHTML={{ __html: post.html }}></div> */}
          <S.Html dangerouslySetInnerHTML={{ __html: post.html }}></S.Html>
        </S.Content>
      </S.Sidebar>
      {/* <CommentCount config={disqusConfig} placeholder={'...'} /> */}
      <h1><S.Comment />討論區</h1>
      <Disqus config={disqusConfig} />
    </>
  );
};

export const query = graphql`
  query Post($locale: String!, $title: String!) {
    markdownRemark(
      frontmatter: { title: { eq: $title } }
      fields: { locale: { eq: $locale } }
    ) {
      id
      frontmatter {
        title
        description
        showToc
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

export default Post;
