import React from 'react';
import Media from 'react-media';

const Mobile = ({ children }) => <Media query="(max-width: 768px)">{children}</Media>;
export default Mobile;