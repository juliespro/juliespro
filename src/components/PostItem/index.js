import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import useTranslations from '../useTranslations';

import * as S from './styled';

const PostItem = ({
  slug,
  background,
  category,
  date,
  timeToRead,
  title,
  description,
  image,
}) => {
  const { toRead } = useTranslations();

  const { listImages } = useStaticQuery(
    graphql`
      query {
        listImages: allFile {
          edges {
            node {
              childImageSharp {
                fluid(maxWidth: 600, maxHeight: 350) {
                  src
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    `,
  );

  const postImgCover = listImages.edges.find(img => {
    return img.node.childImageSharp.fluid.src.includes('cover');
  });
  // console.log(image)
  // const imgName = image ? image.split('/')[3] : false;
  // console.log(imgName)

  // const postImg = imgName
  //   ? listImages.edges.find(img => {
  //       return img.node.childImageSharp ? img.node.childImageSharp.fluid.src.includes(imgName): false;

  //     })
  //   : false;
  const postImg = image? image: false
// .node.childImageSharp.fluid}
  return (
    <S.PostItemLink to={slug}>
      <S.PostItemWrapper>
        {postImg && (
          <S.PostItemImg
            fluid={postImg}
            alt={title}
          />
        )}
        {!postImg && (
          <S.PostItemImg
            fluid={postImgCover}
            alt={title}
          />
        )}

        <S.PostItemInfo>
          <S.PostItemTag background={background}>
            {category}
          </S.PostItemTag>
          <S.PostItemDate>
            {date} • {timeToRead} {toRead}
          </S.PostItemDate>
          <S.PostItemTitle>{title}</S.PostItemTitle>
          <S.PostItemDescription>{description}</S.PostItemDescription>
        </S.PostItemInfo>
      </S.PostItemWrapper>
    </S.PostItemLink>
  );
};

PostItem.propTypes = {
  slug: PropTypes.string.isRequired,
  background: PropTypes.string,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  timeToRead: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default PostItem;
