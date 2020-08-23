import React from 'react';
import { graphql } from 'gatsby';
import PostItem from '../components/PostItem';
import * as S from '../components/ListWrapper/styled';
import TitlePage from '../components/TitlePage';
import SEO from '../components/seo';
import Hero from "../components/Hero";

const Category = props =>{
    const postList = props.data.allMarkdownRemark.edges;
    const { category, number } = props.pageContext;
    const heroFluid = postList[0].node.frontmatter.image.childImageSharp.fluid
    return(
        <>
            <SEO title={category} />
            <Hero fluid={heroFluid}></Hero>
            <TitlePage text={category} />
            <h3>  此分類有 {number} 篇文章 </h3>
            <br/>
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
                    const fluid = image.childImageSharp.fluid
                    return (
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
        </>
    )
}

export const query = graphql`
  query Category($locale: String!, $dateFormat: String!, $category: String!) {
    allMarkdownRemark(
      sort: {fields: frontmatter___date, order: DESC}, 
      filter: { 
        fields: { locale: { eq: $locale } } 
        frontmatter: {category: {eq: $category}}
        fileAbsolutePath: {regex: "/(blog)\/.*\\.md$/"}
      }
    ){
      edges {
        node {
          
          frontmatter {
            title
            description
            category
            background
            image {
              childImageSharp {
                fluid(maxWidth: 600, maxHeight: 350) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            date(formatString: $dateFormat)

          }
          timeToRead
          fields {
            locale
            slug
          }
        }
      }
    }
    fileName: file(relativePath: { eq: "blog.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 1920) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;


export default Category;