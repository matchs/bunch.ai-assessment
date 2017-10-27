import React from 'react';
import Media from 'react-media';

const Desktop = ({ children }) => <Media query="(min-width: 769px)">{children}</Media>;
export default Desktop;