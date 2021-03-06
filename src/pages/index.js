import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import PostItem from '../components/PostItem';
import TitlePage from '../components/TitlePage';
import LocalizedLink from '../components/LocalizedLink';
import useTranslations from '../components/useTranslations';
import StyledBackgroundSection from '../components/BackgroundSection'
import Hero from '../components/Hero'
import * as S from '../components/ListWrapper/styled';
import {Container as BLContainer}  from '../layouts/styled';

const Index = ({ data: { allMarkdownRemark,fileName } }) => {
  // useTranslations is aware of the global context (and therefore also "locale")
  // so it'll automatically give back the right translations
  const {
    hello,
    subline,
    category,
    latestPosts,
    allPosts,
  } = useTranslations();

  const postList = allMarkdownRemark.edges;
  const heroFluid = fileName.childImageSharp.fluid
  const sublineStyle = {
    color: 'white',
    textShadow: 'rgb(0, 0, 0) 0px 0px 60px'
  }
  return (
    <div className="homepage">
      <SEO title="Home" />
      {/* <StyledBackgroundSection></StyledBackgroundSection> */}
      <Hero fluid={heroFluid} height='600'>
        <BLContainer style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}>
          <TitlePage text={hello} marginTop='auto'/>
          <p style={sublineStyle}>{subline}</p>
        </BLContainer>
      </Hero>
      
      {/* <hr style={{ margin: `2rem 0` }} /> */}
      <h2>
        <strong>{latestPosts}</strong>
      </h2>

      <br />

      <S.ListWrapper>
        {postList.map(
          ({
            node: {
              frontmatter: {
                background,
                category,
                date,
                description,
                title,
                image,
              },
              timeToRead,
              fields: { slug },
            },
          }) => {
            // console.log(image.childImageSharp.fluid)
            const fluid = image && image.childImageSharp ? image.childImageSharp.fluid : image
            
            return(
              <PostItem
                slug={`/blog/${slug}`}
                background={background}
                category={category}
                date={date}
                timeToRead={timeToRead}
                title={title}
                description={description}
                image={fluid}
                key={slug}
              />
            )},
        )}
      </S.ListWrapper>

      <br />

      <LocalizedLink to={`/blog/`}>{allPosts}</LocalizedLink>
    </div>
  );
};

export default Index;

// image
export const query = graphql`
  query Index($locale: String!, $dateFormat: String!, ) {
    allMarkdownRemark(
      filter: {
        fields: { locale: { eq: $locale } }
        fileAbsolutePath: {regex: "/(blog)\/.*\\.md$/"}
      }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 2
    ) {
      edges {
        node {
          frontmatter {
            title
            description
            category
            background
            date(formatString: $dateFormat)
            image {
              childImageSharp {
                fluid(maxWidth: 600, maxHeight: 350) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          timeToRead
          fields {
            locale
            slug
          }
        }
      }
    }
    fileName: file(relativePath: { eq: "cover.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
