import React from 'react';
import useTranslations from '../useTranslations';
import SocialLinks from '../SocialLinks';

import * as S from './styled';

const Footer = () => {
  const {
    aboutProject,
    seeMore,
    maintainedBy,
    contributeMessage,
  } = useTranslations();

  return (
    <S.FooterWrapper>
      <S.FooterContainer>
        <SocialLinks />
        <p>
          {aboutProject}{' '}
          <a
            href="https://www.instagram.com/julies.pro"
            target="_blank"
          >
            {seeMore}
          </a>
          .
        </p>
        <p>
          {maintainedBy}{' '}
          <a
            href="https://www.instagram.com/julies.pro"
            target="_blank"
          >
            @julies.pro
          </a>
          . {contributeMessage}{' '}
          <a
            href="https://github.com/juliespro/juliespro"
            target="_blank"
          >
            Github
          </a>
          .
        </p>
      </S.FooterContainer>
    </S.FooterWrapper>
  );
};

export default Footer;
