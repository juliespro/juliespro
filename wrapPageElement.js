import React from 'react';
import AppProvider from './src/hooks';
import { BaseLayout } from './src/layouts/BaseLayout';
import GlobalStyles from './src/styles/global';


// Pass all props (hence the ...props) to the layout component so it has access to things like pageContext or location
const wrapPageElement = ({ element, props }) => (
  <AppProvider>
    <GlobalStyles />
    <BaseLayout {...props}>{element}</BaseLayout>
  </AppProvider>
);

export default wrapPageElement;
