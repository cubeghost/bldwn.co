import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import './index.scss'; // important that this comes before components

import Header from '../components/Header';
import Presence from '../components/Presence';

const TemplateWrapper = ({ children, location }) => (
  <div className="container">
    <Helmet
      title="alex baldwin"
    />
    <Header location={location} />
    <Presence />
    <div>
      {children()}
    </div>
  </div>
);

TemplateWrapper.propTypes = {
  children: PropTypes.func,
};

export default TemplateWrapper;
