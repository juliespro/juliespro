import React from 'react';
import PropTypes from 'prop-types';
export * from './useEventListener'
export * from './useOnClickOutside'

import { LocaleProvider } from './locale';
import { MenuProvider } from './menu';

// Wrapping the application with all Contexts
const AppProvider = ({ children }) => (
  <LocaleProvider>
    <MenuProvider>{children}</MenuProvider>
  </LocaleProvider>
);

AppProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default AppProvider;