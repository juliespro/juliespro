import React from 'react';
import { graphql } from 'gatsby';
import PostItem from '../components/PostItem';
import TitlePage from '../components/TitlePage';
import SEO from '../components/seo';
import Hero from "../components/Hero";
import Pagination from '../components/Pagination';

import * as S from '../components/ListWrapper/styled';

const Blog = props => {
  const postList = props.data.allMarkdownRemark.edges;

  // Logic for Pagination Component
  const { currentPage, numPages } = props.pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1 ? '/blog' : `/blog/${currentPage - 1}`;
  const nextPage = `/blog/page/${currentPage + 1}`;
  const heroFluid = props.data.fileName.childImageSharp.fluid
  
  return (
    <>
      <SEO title="Blog" />
      <Hero fluid={heroFluid}></Hero>
      <TitlePage text="Blog" />

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

      <Pagination
        isFirst={isFirst}
        isLast={isLast}
        currentPage={currentPage}
        numPages={numPages}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </>
  );
};
// image
export const query = graphql`
  query PostsList($locale: String!, $dateFormat: String!, $skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: {fields: frontmatter___date, order: DESC}, 
      filter: { 
        fields: { locale: { eq: $locale } } 
        fileAbsolutePath: {regex: "/(blog)\/.*\\.md$/"}
      }
      limit: $limit
      skip: $skip
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

export default Blog;
