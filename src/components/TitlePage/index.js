import React from 'react';

import * as S from './styled';

const TitlePage = props => {
  const { text, marginTop } = props;
  return <S.TitleElement marginTop={marginTop} >{text}</S.TitleElement>;
};

export default TitlePage;
