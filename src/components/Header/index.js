import React from 'react';
import Link from 'gatsby-link';

import './header.scss';

const Header = ({ location }) => (
  <header>
    <Link to="/">alex baldwin</Link>

    <nav>
      {location.pathname === '/' ? (
        <Link to="/work">work</Link>
      ) : (
        <Link to="/">↩</Link>
      )}
      <a href="https://github.com/cubeghost" target="_blank" rel="noopener">github</a>
      <a href="https://codepen.io/cubeghost" target="_blank" rel="noopener">codepen</a>
      <a href="https://twitter.com/cubeghost" target="_blank" rel="noopener">twitter</a>
    </nav>
  </header>
);

export default Header;
