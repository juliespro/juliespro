import React, {useEffect}  from 'react';
import { graphql, Link, navigate } from 'gatsby';
import TitlePage from '../components/TitlePage';
import SEO from '../components/seo';
import StyledBackgroundSection from '../components/BackgroundSection'
import { Disqus, CommentCount } from 'gatsby-plugin-disqus'
import Hero from '../components/Hero'
import Toc from '../components/Toc'
import TocSpace from '../components/TocSpace'
import useTranslations from '../components/useTranslations';

import styled from 'styled-components';

import * as S from '../components/Content/styled';

const Post = props => {
  useEffect( () => {
    // Anything in here is fired on component mount.
    window.addEventListener('scroll', function() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
         console.log("you're at the bottom of the page");
        //  navigate(`/tw/blog/r學習筆記］如何繪製存活曲線？`)
        //  navigate(-1)
         //show loading spinner and make fetch request to api
      }
   });
 }, []);
  const post = props.data.markdownRemark;
  // const language = post.fields.locale=='tw'?'zh':post.fields.locale
  const image = post.frontmatter.image
  // const fluid = image && image.childImageSharp ? image.childImageSharp.fluid : image
  const fluid = image.childImageSharp.fluid
  // const imageSrc = fluid && fluid.src ? fluid.src : image 
  const imageSrc = fluid.src
  const showToc = post.frontmatter.showToc
  const { comment } = useTranslations();
  let disqusConfig = {
  //   url: `${config.siteUrl+location.pathname}`,
    identifier: post.id,
    title: post.frontmatter.title,
    // language: language
  }
//   $(window).scroll(function() {
//     if($(window).scrollTop() + $(window).height() == $(document).height()) {
//         alert("bottom!");
//     }
//  });
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
        {showToc  && <Toc />}
        {!showToc && <TocSpace />}
        <S.Content>
          {/* <div style={{display: 'inline-block', width:'calc( 100% - 20em )', verticalAlign: 'top'}} dangerouslySetInnerHTML={{ __html: post.html }}></div> */}
          <S.Html dangerouslySetInnerHTML={{ __html: post.html }}></S.Html>
          
        </S.Content>
        
      </S.Sidebar>
      {/* <CommentCount config={disqusConfig} placeholder={'...'} /> */}
      <h1 id='comment'>
        <S.Comment />{comment}
      </h1>
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
