import React from 'react';

// import { Instagram } from 'styled-icons/boxicons-logos/Instagram';
// import { Github } from 'styled-icons/boxicons-logos/Github';
import {Instagram, Github} from '@styled-icons/boxicons-logos'

import * as S from './styled';

const SocialLinks = () => {
  return (
    <S.SocialLinksList>
      <S.SocialLinksItem>
        <S.SocialLinksLink
          href="https://github.com/juliespro/juliespro"
          title="Github"
          target="_blank"
        >
          <Github />
        </S.SocialLinksLink>
      </S.SocialLinksItem>
      <S.SocialLinksItem>
        <S.SocialLinksLink
          href="https://www.instagram.com/julies.pro"
          title="Instagram"
          target="_blank"
        >
          <Instagram />
        </S.SocialLinksLink>
      </S.SocialLinksItem>
    </S.SocialLinksList>
  );
};

export default SocialLinks;
